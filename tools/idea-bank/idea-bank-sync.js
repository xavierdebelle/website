/* Cloud sync — local first, optional, live while signed in.
   Ported unchanged in behaviour from Idea Bank v3 (shared with Project Phases
   and Budget Tracker), including membership: sync is by invitation. Everything tool-specific lives in the adapter passed in;
   the UI is painted through adapter.paint(view) instead of touching the DOM. */
(function () {
  'use strict';

  var FIREBASE = {
    apiKey:      'AIzaSyCu0CA6eLWIkhhl-Z7jr_dDisuXDt1dKco',
    authDomain:  'xdb-tools.firebaseapp.com',
    databaseURL: 'https://xdb-tools-default-rtdb.firebaseio.com',
    projectId:   'xdb-tools',
    appId:       '1:6009567091:web:f7ee8c43ebe1bd25fcb706'
  };
  var SDK = 'https://www.gstatic.com/firebasejs/10.12.2/';
  var OWNER = 'jGJdt3h4EeaOL3mYWUHA4yMZsRx2';
  var ACCESS_URL = '../access.html';   // where requests are approved; tools live in tools/

  function createCloudSync(SYNC) {
    var META_KEY = SYNC.storageKey + '.meta';
    var cloud = {
      on: !!FIREBASE.databaseURL, status: 'signedout', uid: null, authed: false, listening: false,
      at: 0, msg: '', fb: null, timer: null, busy: false, again: false, pending: null,
      print: null, outgoing: 0, unwatch: null, unmember: null, asked: false
    };

    function explain(code) {
      var offline = 'No connection. Everything still saves on this device and will sync when you are back online.';
      var map = {
        'auth/unauthorized-domain': 'This site is not on the Firebase authorised domains list. Add ' + location.hostname + ' under Authentication → Settings → Authorized domains.',
        'auth/operation-not-allowed': 'Google sign-in is not enabled for this Firebase project. Turn it on under Authentication → Sign-in method.',
        'auth/popup-blocked': 'Your browser blocked the sign-in popup. Allow popups for this site, or try again.',
        'auth/popup-closed-by-user': 'The sign-in window closed before it finished.',
        'auth/network-request-failed': offline, 'unavailable': offline, 'timeout': offline,
        'PERMISSION_DENIED': 'The database rules refused this account. Check the rules allow users/<your uid>.'
      };
      return map[code] || ('Sync failed' + (code ? ' (' + code + ')' : '') + '.');
    }
    function deviceName() {
      var ua = navigator.userAgent;
      if (/iPhone/.test(ua)) return 'iPhone';
      if (/iPad/.test(ua)) return 'iPad';
      if (/Android/.test(ua)) return 'Android';
      if (/Mac OS X/.test(ua)) return 'Mac';
      if (/Windows/.test(ua)) return 'Windows';
      return 'this device';
    }
    function meta() {
      try {
        var m = JSON.parse(localStorage.getItem(META_KEY) || '{}');
        return { updatedAt: +m.updatedAt || 0, lastSyncedAt: +m.lastSyncedAt || 0, signedIn: !!m.signedIn };
      } catch (e) { return { updatedAt: 0, lastSyncedAt: 0, signedIn: false }; }
    }
    function setMeta(patch) {
      var m = meta();
      for (var k in patch) m[k] = patch[k];
      try { localStorage.setItem(META_KEY, JSON.stringify(m)); } catch (e) {}
      return m;
    }
    function nextStamp() { return Math.max(Date.now(), meta().lastSyncedAt + 1, cloud.outgoing + 1); }
    function syncPrint() { return JSON.stringify(SYNC.payload()); }
    function seedMeta() {
      var noWatermark = false;
      try { noWatermark = localStorage.getItem(META_KEY) == null; } catch (e) {}
      if (noWatermark && !SYNC.untouched()) setMeta({ updatedAt: 1 });
      cloud.print = syncPrint();
    }
    function loadSDK() {
      if (cloud.fb) return Promise.resolve(cloud.fb);
      if (window.__xdbFirebase) return window.__xdbFirebase.then(function (fb) { cloud.fb = fb; return fb; });
      return (window.__xdbFirebase = Promise.all([
        import(SDK + 'firebase-app.js'), import(SDK + 'firebase-auth.js'), import(SDK + 'firebase-database.js')
      ]).then(function (mods) {
        var app = mods[0].initializeApp(FIREBASE);
        cloud.fb = { auth: mods[1].getAuth(app), db: mods[2].getDatabase(app), a: mods[1], f: mods[2] };
        return cloud.fb;
      }).catch(function (err) { window.__xdbFirebase = null; throw err; }));
    }
    function docRef() { return cloud.fb.f.ref(cloud.fb.db, 'users/' + cloud.uid + '/tools/' + SYNC.doc); }
    function withTimeout(p, ms) {
      return Promise.race([p, new Promise(function (_, no) { setTimeout(function () { no({ code: 'timeout' }); }, ms); })]);
    }
    function reconcile(remote) {
      var m = meta(), localAt = m.updatedAt, syncedAt = m.lastSyncedAt;
      var remoteAt = remote ? (+remote.updatedAt || 0) : 0;
      if (!remote) return localAt ? 'push' : 'idle';
      if (remoteAt === syncedAt) return localAt > syncedAt ? 'push' : 'idle';
      return localAt > syncedAt ? 'conflict' : 'pull';
    }
    function adopt(remote) {
      var d = remote && remote.data;
      if (!d) return false;
      if (!SYNC.apply(d, remote)) return false;
      cloud.print = syncPrint();
      var stamp = +remote.updatedAt || Date.now();
      setMeta({ updatedAt: stamp, lastSyncedAt: stamp });
      return true;
    }
    function pushNow() {
      var stamp = nextStamp(), print = syncPrint();
      cloud.outgoing = stamp;
      return cloud.fb.f.set(docRef(), { data: JSON.parse(print), updatedAt: stamp, device: deviceName() }).then(function () {
        var ahead = syncPrint() !== print;
        setMeta({ lastSyncedAt: stamp, updatedAt: ahead ? Math.max(meta().updatedAt, stamp + 1) : stamp });
        cloud.at = stamp;
        if (ahead) cloud.again = true;
      });
    }
    function pullNow() {
      return withTimeout(cloud.fb.f.get(docRef()), 12000).then(function (snap) { return snap.exists() ? snap.val() : null; });
    }
    function decide(remote) {
      var move = reconcile(remote);
      if (move === 'pull') { adopt(remote); cloud.at = Date.now(); setStatus('synced'); return; }
      if (move === 'push') { return pushNow().then(function () { setStatus('synced'); }); }
      if (move === 'conflict') { cloud.pending = remote; setStatus('conflict'); return; }
      cloud.at = Date.now();
      setStatus('synced');
    }
    function syncNow(userAsked, known) {
      if (!cloud.on || !cloud.uid) return Promise.resolve();
      if (cloud.busy) { cloud.again = true; return Promise.resolve(); }
      if (cloud.status === 'conflict' && !userAsked) return Promise.resolve();
      cloud.busy = true; cloud.again = false;
      clearTimeout(cloud.timer);
      setStatus('working');
      return (known ? Promise.resolve(known) : pullNow()).then(decide).then(function () {
        cloud.busy = false;
        if (cloud.again && cloud.status !== 'conflict') return syncNow();
      }, function (err) {
        cloud.busy = false;
        cloud.msg = (err && err.code) || 'failed';
        setStatus('error');
        if (userAsked) console.warn('[sync]', err);
      });
    }
    function touch() {
      if (cloud.print === null) return;
      var p = syncPrint();
      if (p === cloud.print) return;
      cloud.print = p;
      setMeta({ updatedAt: nextStamp() });
      if (!cloud.on || !cloud.uid) return;
      clearTimeout(cloud.timer);
      cloud.timer = setTimeout(function () { syncNow(); }, 600);
    }
    function watch() {
      if (cloud.unwatch || !cloud.uid) return;
      cloud.unwatch = cloud.fb.f.onValue(docRef(), function (snap) {
        var remote = snap.exists() ? snap.val() : null;
        if (!remote) return;
        var at = +remote.updatedAt || 0;
        if (at === cloud.outgoing || at === meta().lastSyncedAt) return;
        if (cloud.status === 'conflict') { cloud.pending = remote; paint(); return; }
        if (cloud.busy) { cloud.again = true; return; }
        syncNow(false, remote);
      }, function (err) {
        cloud.unwatch = null;
        cloud.msg = (err && err.code) || 'failed';
        setStatus('error');
      });
    }
    function stopWatching() { if (cloud.unwatch) { cloud.unwatch(); cloud.unwatch = null; } }
    /* Membership — same rules as the classic core: Xavier always syncs;
       anyone else is watched live at members/{uid}, and signing in files an
       access request that he approves on the Access page. */
    function admit(uid) {
      if (cloud.uid === uid) return;
      cloud.uid = uid;
      syncNow();
      watch();
    }
    function stopMembership() { if (cloud.unmember) { cloud.unmember(); cloud.unmember = null; } }
    function askForAccess(user) {
      if (cloud.asked) { setStatus('pending'); return; }
      cloud.asked = true;
      cloud.fb.f.set(cloud.fb.f.ref(cloud.fb.db, 'requests/' + user.uid), {
        email: user.email || '', name: (user.displayName || '').slice(0, 120), at: Date.now(), tool: SYNC.doc
      }).then(function () { if (!cloud.uid) setStatus('pending'); },
              function () { if (!cloud.uid) setStatus('private'); });
    }
    function checkMembership(user) {
      if (user.uid === OWNER) { admit(user.uid); return; }
      setStatus('working');
      cloud.unmember = cloud.fb.f.onValue(cloud.fb.f.ref(cloud.fb.db, 'members/' + user.uid), function (snap) {
        if (!cloud.on) return;
        if (snap.exists()) { admit(user.uid); return; }
        if (cloud.uid) { cloud.uid = null; stopWatching(); clearTimeout(cloud.timer); }
        askForAccess(user);
      }, function () {
        cloud.uid = null;
        stopWatching();
        setStatus('private');
      });
    }
    function listen(fb) {
      if (cloud.listening) return;
      cloud.listening = true;
      cloud.unauth = fb.a.onAuthStateChanged(fb.auth, function (user) {
        if (!cloud.on) return;
        cloud.authed = !!user;
        setMeta({ signedIn: !!user });
        stopWatching();
        stopMembership();
        cloud.uid = null;
        cloud.asked = false;
        if (!user) { setStatus('signedout'); return; }
        checkMembership(user);
      });
    }
    function signIn() {
      if (!cloud.on) return;
      setMeta({ signedIn: true });
      setStatus('working');
      loadSDK().then(function (fb) {
        listen(fb);
        var provider = new fb.a.GoogleAuthProvider();
        return fb.a.signInWithPopup(fb.auth, provider).catch(function (err) {
          if (err && /popup-blocked|operation-not-supported/i.test(err.code || '')) return fb.a.signInWithRedirect(fb.auth, provider);
          throw err;
        });
      }).catch(function (err) {
        setMeta({ signedIn: false });
        cloud.msg = (err && err.code) || 'failed';
        setStatus('error');
      });
    }
    function signOut() { if (cloud.fb) cloud.fb.a.signOut(cloud.fb.auth); }
    function click() { if (!cloud.uid) signIn(); else syncNow(true); }
    function keepLocal() {
      var remote = cloud.pending; if (!remote) return;
      cloud.pending = null;
      var seen = +remote.updatedAt || 0;
      setMeta({ lastSyncedAt: seen, updatedAt: Math.max(meta().updatedAt, seen + 1) });
      cloud.status = 'working';
      syncNow(true);
    }
    function keepCloud() {
      var remote = cloud.pending; if (!remote) return;
      cloud.pending = null;
      adopt(remote);
      cloud.at = Date.now();
      setStatus('synced');
    }
    function hhmm(ms) {
      var d = new Date(ms);
      return (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    }
    function setStatus(s) {
      cloud.status = s;
      if (s === 'synced') cloud.at = cloud.at || Date.now();
      paint();
    }
    function paint() {
      var v = { status: cloud.status, authed: cloud.authed, barOn: false, barText: '', showKeep: false };
      switch (cloud.status) {
        case 'working':  v.label = 'Syncing…'; v.title = 'Talking to the cloud'; break;
        case 'synced':   v.label = 'Live · ' + hhmm(cloud.at); v.title = 'Signed in. Changes on your other devices appear here as they happen'; break;
        case 'conflict': v.label = 'Both changed'; v.title = 'This device and the cloud disagree'; break;
        case 'pending':  v.label = 'Access requested'; v.title = 'Waiting for Xavier to approve this account'; break;
        case 'private':  v.label = 'No access'; v.title = 'This account is not on the invitation list'; break;
        case 'error':    v.label = 'Sync failed'; v.title = explain(cloud.msg); break;
        default:         v.label = 'Sign in to sync'; v.title = 'Keep this in step across your devices';
      }
      if (cloud.status === 'pending' || cloud.status === 'private' || cloud.status === 'error') {
        v.barOn = true;
        v.barText = cloud.status === 'pending'
          ? 'Sync is by invitation, and your request is in. Once Xavier approves it, syncing starts here on its own. Until then everything keeps saving in this browser as usual.'
          : cloud.status === 'private'
          ? 'Sync on this site is by invitation, and this account isn\u2019t on the list. Everything still saves in this browser exactly as before, and nothing is sent anywhere.'
          : explain(cloud.msg);
        if (cloud.status !== 'error') v.link = { href: ACCESS_URL, text: 'About access \u2192' };
      } else if (cloud.status === 'conflict' && cloud.pending) {
        v.barOn = true; v.showKeep = true;
        v.barText = 'This ' + deviceName() + ' and the cloud copy have both changed since they last agreed. The cloud copy was last written ' +
          hhmm(+cloud.pending.updatedAt) + ' from ' + (cloud.pending.device || 'another device') + '. ' + SYNC.describe(cloud.pending.data);
      }
      SYNC.paint(v);
    }
    function onVis() {
      if (!cloud.uid) return;
      if (document.hidden) { SYNC.flush(); if (meta().updatedAt > meta().lastSyncedAt) syncNow(); }
      else syncNow();
    }
    function onWake() { if (cloud.uid) syncNow(); }
    function init() {
      seedMeta();
      paint();
      if (!cloud.on) return;
      if (meta().signedIn) {
        setStatus('working');
        loadSDK().then(listen).catch(function (err) { cloud.msg = (err && err.code) || 'failed'; setStatus('error'); });
      }
      document.addEventListener('visibilitychange', onVis);
      window.addEventListener('focus', onWake);
      window.addEventListener('online', onWake);
    }
    function destroy() {
      cloud.on = false;
      cloud.uid = null;
      if (cloud.unauth) { cloud.unauth(); cloud.unauth = null; }
      stopWatching();
      stopMembership();
      clearTimeout(cloud.timer);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('focus', onWake);
      window.removeEventListener('online', onWake);
    }
    return { init: init, destroy: destroy, touch: touch, click: click, signOut: signOut, keepLocal: keepLocal, keepCloud: keepCloud,
             cloud: cloud, meta: meta, reconcile: reconcile };
  }

  window.createCloudSync = createCloudSync;
})();
