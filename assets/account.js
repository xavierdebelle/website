/* ============================================================
   XAVIER DE BELLE — site-wide account
   ------------------------------------------------------------
   One sign-in for the whole site. Signing in here, in a tool, on the
   Access page or in Food for Thought signs you in everywhere on this
   device; signing out anywhere signs you out everywhere, open tabs
   included. Google keeps the session for this address; this file only
   decides when to load it, and shows who is signed in:

     - an account button (initial or photo + a status dot) in every page's
       top bar, on the map, and on each synced tool's sync button
     - a panel: status, the synced tools and when each last synced,
       Sync now, Sign out, and for Xavier the requests waiting

   Tools work without this file (they fall back to their own sign-in), so
   a tool opened on its own still works.

   Public API (window.xdbAccount):
     sdk()           -> Promise<{app, auth, db, a, f}>, loaded once
     wanted()        -> true if this device has signed in before
     signIn()/signOut()
     openPanel()/closePanel()
     on(fn)          -> called with state on every change; returns off()
     state()         -> { status, user, pending }
     badgeHTML()     -> the avatar + dot, for a tool's own button
     registerTool({doc, syncNow})  -> adds "Sync now" for the open tool
   Status: signedout | checking | owner | member | pending | declined | error
   ============================================================ */
(function () {
  'use strict';
  if (window.xdbAccount) return;

  var FIREBASE = {
    apiKey:      'AIzaSyCu0CA6eLWIkhhl-Z7jr_dDisuXDt1dKco',
    authDomain:  'xdb-tools.firebaseapp.com',
    databaseURL: 'https://xdb-tools-default-rtdb.firebaseio.com',
    projectId:   'xdb-tools',
    appId:       '1:6009567091:web:f7ee8c43ebe1bd25fcb706'
  };
  var SDK = 'https://www.gstatic.com/firebasejs/10.12.2/';
  var OWNER = 'jGJdt3h4EeaOL3mYWUHA4yMZsRx2';
  var FLAG = 'xdb.account';                 // "this device is signed in" — shared by every page and tool
  var WELCOMED = 'xdb.account.welcomed';

  /* where the site root is, from this file's own address (…/assets/account.js) */
  var ROOT = (function () {
    var s = document.currentScript && document.currentScript.src;
    return s ? s.replace(/assets\/account\.js(\?.*)?$/, '') : '';
  })();

  var TOOLS = [
    { doc: 'project-phases', name: 'Project Phases', href: 'tools/project-tracker.html', meta: 'ptt.v1.meta' },
    { doc: 'budget-tracker', name: 'Budget Tracker', href: 'tools/budget-tracker.html', meta: 'debelle.budget-tracker.v3.meta' },
    { doc: 'idea-bank',      name: 'Idea Bank',      href: 'tools/idea-bank.html',      meta: 'ideabank.v1.meta' },
    { doc: 'notes',          name: 'Notes',          href: 'tools/notes.html',          meta: 'xdb.notes.v1.meta' },
    { doc: 'journal',        name: 'Journal',        href: 'tools/journal.html',        meta: 'xdb.journal.v1.meta' }
  ];

  var S = { status: 'signedout', user: null, pending: 0, msg: '' };
  var fb = null, sdkP = null, subs = [], offs = [], asked = false, current = null, listening = false;

  function store(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  function recall(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---------------------------------------------------------------- SDK */
  function sdk() {
    if (sdkP) return sdkP;
    sdkP = Promise.all([
      import(SDK + 'firebase-app.js'), import(SDK + 'firebase-auth.js'), import(SDK + 'firebase-database.js')
    ]).then(function (m) {
      var app = m[0].initializeApp(FIREBASE);
      fb = { app: app, a: m[1], auth: m[1].getAuth(app), f: m[2], db: m[2].getDatabase(app) };
      return fb;
    }).catch(function (err) { sdkP = null; throw err; });
    return sdkP;
  }

  function set(patch) {
    for (var k in patch) S[k] = patch[k];
    paint();
    subs.forEach(function (fn) { try { fn(S); } catch (e) {} });
  }
  function drop() { offs.forEach(function (off) { try { off(); } catch (e) {} }); offs = []; }

  /* ------------------------------------------------------------ session */
  function listen() {
    if (listening) return;
    listening = true;
    fb.a.onAuthStateChanged(fb.auth, function (u) {
      drop();
      asked = false;
      if (!u) { store(FLAG, null); set({ status: 'signedout', user: null, pending: 0 }); return; }
      store(FLAG, '1');
      var user = { uid: u.uid, email: u.email || '', name: u.displayName || '', photo: u.photoURL || '' };
      if (u.uid === OWNER) { set({ status: 'owner', user: user }); watchRequests(); return; }
      set({ status: 'checking', user: user });
      offs.push(fb.f.onValue(fb.f.ref(fb.db, 'members/' + u.uid), function (snap) {
        if (snap.exists()) { set({ status: 'member' }); welcome(u.uid); return; }
        if (asked) { if (S.status === 'member') set({ status: 'pending' }); return; }
        asked = true;
        fb.f.set(fb.f.ref(fb.db, 'requests/' + u.uid), {
          email: user.email, name: user.name.slice(0, 120), at: Date.now(), tool: current ? current.doc : 'site'
        }).then(function () { if (S.status !== 'member') set({ status: 'pending' }); },
                function () { if (S.status !== 'member') set({ status: 'declined' }); });
      }, function () { set({ status: 'declined' }); }));
    });
  }
  function watchRequests() {
    offs.push(fb.f.onValue(fb.f.ref(fb.db, 'requests'), function (snap) {
      var v = snap.val() || {};
      set({ pending: Object.keys(v).length });
    }, function () {}));
  }

  function signIn() {
    store(FLAG, '1');                       // so a redirect sign-in is picked up on return
    if (S.status === 'signedout') set({ status: 'checking' });
    return sdk().then(function () {
      listen();
      var p = new fb.a.GoogleAuthProvider();
      if (p.setCustomParameters) p.setCustomParameters({ prompt: 'select_account' });   // always offer the account picker
      return fb.a.signInWithPopup(fb.auth, p).catch(function (err) {
        if (err && /popup-blocked|operation-not-supported/i.test(err.code || '')) return fb.a.signInWithRedirect(fb.auth, p);
        throw err;
      });
    }).catch(function (err) {
      if (!(fb && fb.auth && fb.auth.currentUser)) store(FLAG, null);
      if (err && err.code === 'auth/popup-closed-by-user') { set({ status: S.user ? S.status : 'signedout' }); return; }
      set({ status: S.user ? S.status : 'error', msg: (err && err.code) || 'failed' });
      throw err;
    });
  }
  function signOut() {
    store(FLAG, null);
    closePanel();
    if (fb) return fb.a.signOut(fb.auth);
    set({ status: 'signedout', user: null });
    return Promise.resolve();
  }

  function welcome(uid) {
    if (recall(WELCOMED) === uid) return;
    store(WELCOMED, uid);
    toast('You’re in. Project Phases, Budget Tracker and Idea Bank now sync across your devices.');
  }

  /* ---------------------------------------------------------------- UI */
  var CSS = [
    '.xa-chip{display:inline-flex;align-items:center;gap:8px;background:#000;color:#fff;border:2px solid #fff;padding:4px 10px 4px 4px;',
    'font:700 11px/1 ui-monospace,"SF Mono",Menlo,Consolas,monospace;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;border-radius:0;white-space:nowrap}',
    '.xa-chip:hover,.xa-chip:focus-visible{border-color:#ffe800;color:#ffe800;outline:none}',
    '.xa-chip.xa-out{padding:7px 12px}',
    '.xa-av{position:relative;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:#ffe800;color:#000;',
    'font:900 12px/1 "Helvetica Neue",Helvetica,Arial,sans-serif;letter-spacing:0;text-transform:uppercase;flex:none;overflow:visible;vertical-align:middle}',
    '.xa-av img{width:100%;height:100%;object-fit:cover;display:block}',
    '.xa-dot{position:absolute;right:-4px;bottom:-4px;width:10px;height:10px;border:2px solid #000;background:#ffe800;box-sizing:content-box}',
    '.xa-dot.xa-wait{background:#000;box-shadow:inset 0 0 0 2px #ffe800}',
    '.xa-dot.xa-no{background:#000;box-shadow:inset 0 0 0 2px #8a8a8a}',
    '.xa-num{min-width:16px;height:16px;padding:0 4px;background:#ffe800;color:#000;display:inline-flex;align-items:center;justify-content:center;font-size:10px;letter-spacing:0}',
    '.xa-float{position:fixed;top:14px;right:14px;z-index:60}',
    '.xa-float .xa-chip:not(.xa-out){padding:4px}.xa-float .xa-lbl{display:none}',   // on the map: avatar and dot only, clear of the name
    '.xa-scrim{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:1000;display:flex;justify-content:flex-end;align-items:flex-start}',
    '.xa-panel{background:#000;color:#fff;border:3px solid #fff;width:min(380px,100vw);max-height:100vh;overflow:auto;margin:12px;padding:22px;box-sizing:border-box;',
    'font:15px/1.5 "Helvetica Neue",Helvetica,Arial,sans-serif;text-align:left}',
    '@media (max-width:560px){.xa-scrim{align-items:flex-end}.xa-panel{margin:0;width:100vw;border-width:3px 0 0}}',
    '.xa-k{font:400 10px/1.2 ui-monospace,"SF Mono",Menlo,Consolas,monospace;letter-spacing:.24em;text-transform:uppercase;color:#8a8a8a;margin:0 0 10px}',
    '.xa-h{font-weight:900;text-transform:uppercase;letter-spacing:-.03em;font-size:30px;line-height:.9;margin:0 0 14px}',
    '.xa-who{display:flex;gap:12px;align-items:center;margin:0 0 16px}',
    '.xa-who .xa-av{width:44px;height:44px;font-size:20px}.xa-who .xa-dot{width:12px;height:12px}',
    '.xa-name{font-weight:900;font-size:17px;line-height:1.2;overflow-wrap:anywhere}.xa-mail{color:#8a8a8a;font-size:13px;overflow-wrap:anywhere}',
    '.xa-status{border-left:3px solid #ffe800;padding:6px 0 6px 12px;margin:0 0 18px;font-size:14px}',
    '.xa-status b{display:block;text-transform:uppercase;letter-spacing:.06em;font-size:12px;margin-bottom:2px}',
    '.xa-status.xa-s-wait{border-color:#8a8a8a}',
    '.xa-list{list-style:none;margin:0 0 18px;padding:0;border-top:2px solid #2a2a2a}',
    '.xa-list li{display:flex;align-items:center;gap:10px;padding:11px 0;border-bottom:2px solid #2a2a2a}',
    '.xa-list a{color:#fff;text-decoration:none;font-weight:900;text-transform:uppercase;letter-spacing:-.01em;font-size:14px;flex:1;min-width:0}',
    '.xa-list a:hover{color:#ffe800}.xa-list small{display:block;font:400 11px/1.4 ui-monospace,"SF Mono",Menlo,monospace;letter-spacing:.04em;color:#8a8a8a;text-transform:none;margin-top:2px}',
    '.xa-list .xa-here{color:#ffe800;font:400 10px/1 ui-monospace,Menlo,monospace;letter-spacing:.16em}',
    '.xa-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 16px;border:3px solid #fff;background:transparent;color:#fff;',
    'font:900 12px/1 "Helvetica Neue",Helvetica,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;border-radius:0;text-decoration:none}',
    '.xa-btn:hover{background:#ffe800;border-color:#ffe800;color:#000}',
    '.xa-btn.xa-solid{background:#ffe800;border-color:#ffe800;color:#000}.xa-btn.xa-solid:hover{background:#fff;border-color:#fff}',
    '.xa-btn.xa-sm{padding:7px 10px;font-size:10px;border-width:2px}',
    '.xa-acts{display:flex;flex-wrap:wrap;gap:10px;align-items:center}',
    '.xa-note{color:#8a8a8a;font-size:12px;margin:10px 0 0}',
    '.xa-admin{display:flex;justify-content:space-between;align-items:center;gap:10px;background:#141414;padding:12px;margin:0 0 18px;font-size:14px}',
    '.xa-admin a{color:#ffe800}',
    '.xa-x{float:right;background:none;border:0;color:#8a8a8a;font-size:22px;line-height:1;cursor:pointer;padding:0 0 0 10px}',
    '.xa-x:hover{color:#ffe800}',
    '.xa-toast{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:1001;background:#ffe800;color:#000;padding:14px 18px;max-width:min(460px,calc(100vw - 32px));',
    'font:700 14px/1.4 "Helvetica Neue",Helvetica,Arial,sans-serif;border:3px solid #000;box-shadow:0 0 0 3px #ffe800}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('xa-css')) return;
    var st = document.createElement('style');
    st.id = 'xa-css';
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }

  function initialOf(u) { return ((u && (u.name || u.email)) || '?').trim().charAt(0).toUpperCase() || '?'; }
  function dotClass() {
    return S.status === 'owner' || S.status === 'member' ? '' : S.status === 'pending' || S.status === 'checking' ? ' xa-wait' : ' xa-no';
  }
  function avatar() {
    var u = S.user;
    var inner = u && u.photo
      ? '<img src="' + esc(u.photo) + '" alt="" referrerpolicy="no-referrer" onerror="this.remove()">'
      : '';
    return '<span class="xa-av" aria-hidden="true">' + (inner || esc(initialOf(u))) + '<span class="xa-dot' + dotClass() + '"></span></span>';
  }
  function statusWord() {
    return { owner: 'Owner', member: 'Synced', pending: 'Waiting', declined: 'Not approved', checking: 'Checking…', error: 'Sign-in failed' }[S.status] || '';
  }
  function badgeHTML() { return S.user ? avatar() : ''; }

  function chipHTML() {
    if (!S.user) return '<button type="button" class="xa-chip xa-out" data-xa="open">' + (S.status === 'checking' ? 'Signing in…' : 'Sign in') + '</button>';
    var extra = S.status === 'owner' && S.pending ? '<span class="xa-num" title="' + S.pending + ' waiting for access">' + S.pending + '</span>' : '';
    return '<button type="button" class="xa-chip" data-xa="open" title="' + esc((S.user.name || S.user.email) + ' · ' + statusWord()) + '">' +
      avatar() + '<span class="xa-lbl">' + esc(statusWord()) + '</span>' + extra + '</button>';
  }

  function paint() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-xdb-account]'), function (el) {
      el.innerHTML = chipHTML();
      if (el.getAttribute('data-xdb-account') === 'float') el.classList.add('xa-float');
    });
    if (document.getElementById('xa-panel')) renderPanel();
  }

  function ago(ms) {
    var s = Math.round((Date.now() - ms) / 1000);
    if (s < 60) return 'just now';
    if (s < 3600) return Math.round(s / 60) + ' min ago';
    if (s < 86400) return Math.round(s / 3600) + ' h ago';
    return Math.round(s / 86400) + ' days ago';
  }
  function toolState(t) {
    var m = null;
    try { m = JSON.parse(recall(t.meta) || 'null'); } catch (e) {}
    var synced = m && +m.lastSyncedAt;
    if (S.status === 'pending' || S.status === 'declined') return m ? 'saves on this device only' : 'not opened on this device';
    if (!S.user) return m ? 'saves on this device' : 'not opened on this device';
    if (synced) return 'synced ' + ago(synced);
    return m ? 'syncing — nothing saved yet' : 'not opened on this device yet — syncs when you do';
  }

  function renderPanel() {
    var box = document.getElementById('xa-panel');
    if (!box) return;
    var h = '<button type="button" class="xa-x" data-xa="close" aria-label="Close">×</button>';
    if (!S.user) {
      h += '<p class="xa-k">Account</p><h2 class="xa-h">Sign in</h2>' +
        '<p style="margin:0 0 18px">Sync Project Phases, Budget Tracker and Idea Bank across your devices. One sign-in covers the whole site. Sync is by invitation — signing in sends your request.</p>' +
        (S.status === 'error' ? '<p class="xa-status xa-s-wait"><b>Didn’t work</b>Sign-in failed' + (S.msg ? ' (' + esc(S.msg) + ')' : '') + '. Try again.</p>' : '') +
        '<div class="xa-acts"><button type="button" class="xa-btn xa-solid" data-xa="signin">' + (S.status === 'checking' ? 'Signing in…' : 'Sign in with Google') + '</button>' +
        '<a class="xa-btn" href="' + ROOT + 'access.html">About access</a></div>' +
        '<p class="xa-note">Every tool also works without an account, saving in this browser. <a href="' + ROOT + 'privacy.html">Privacy</a></p>';
    } else {
      var u = S.user;
      h += '<p class="xa-k">Account</p>' +
        '<div class="xa-who">' + avatar() + '<div><div class="xa-name">' + esc(u.name || u.email) + '</div>' +
        (u.name ? '<div class="xa-mail">' + esc(u.email) + '</div>' : '') + '</div></div>';
      var st = {
        owner:    ['Owner', 'Everything syncs. You approve who else can.'],
        member:   ['Synced', 'Your tools sync across your devices, live.'],
        pending:  ['Waiting for approval', 'Your request is with Xavier. Sync starts by itself once he approves — until then, everything saves on this device.'],
        declined: ['Not approved', 'This account isn’t on the list for sync. The tools still work fully on this device.'],
        checking: ['Checking…', 'Looking up your access.'],
        error:    ['Something went wrong', 'Try signing in again.']
      }[S.status] || ['', ''];
      h += '<div class="xa-status' + (S.status === 'owner' || S.status === 'member' ? '' : ' xa-s-wait') + '"><b>' + st[0] + '</b>' + st[1] + '</div>';
      if (S.status === 'owner') {
        h += '<div class="xa-admin"><span>' + (S.pending ? '<b>' + S.pending + '</b> waiting for access' : 'No one waiting') + '</span>' +
          '<a href="' + ROOT + 'access.html">Manage access →</a></div>';
      }
      h += '<p class="xa-k">Your synced tools</p><ul class="xa-list">' + TOOLS.map(function (t) {
        var here = current && current.doc === t.doc;
        var canSync = here && current.syncNow && (S.status === 'owner' || S.status === 'member');
        return '<li><a href="' + ROOT + t.href + '">' + esc(t.name) + (here ? ' <span class="xa-here">• open</span>' : '') +
          '<small>' + esc(toolState(t)) + '</small></a>' +
          (canSync ? '<button type="button" class="xa-btn xa-sm" data-xa="sync">Sync now</button>' : '') + '</li>';
      }).join('') + '</ul>';
      h += '<div class="xa-acts"><button type="button" class="xa-btn" data-xa="signout">Sign out</button>' +
        (S.status === 'pending' || S.status === 'declined' ? '<a class="xa-btn" href="' + ROOT + 'access.html">About access</a>' : '') + '</div>' +
        '<p class="xa-note">Signing out here signs you out of the whole site on this device. <a href="' + ROOT + 'privacy.html">Privacy</a></p>';
    }
    box.innerHTML = h;
  }

  var lastFocus = null;
  function openPanel() {
    injectCSS();
    if (document.getElementById('xa-panel')) return;
    lastFocus = document.activeElement;
    var scrim = document.createElement('div');
    scrim.className = 'xa-scrim';
    scrim.id = 'xa-scrim';
    scrim.innerHTML = '<div class="xa-panel" id="xa-panel" role="dialog" aria-modal="true" aria-label="Account"></div>';
    document.body.appendChild(scrim);
    renderPanel();
    var first = scrim.querySelector('button, a');
    if (first) try { first.focus(); } catch (e) {}
    // quietly load the SDK if this device is signed in but this page hasn't looked yet
    if (wanted() && !listening) sdk().then(listen).catch(function () {});
  }
  function closePanel() {
    var s = document.getElementById('xa-scrim');
    if (s) s.remove();
    if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) {}
  }

  var toastTimer = 0;
  function toast(text) {
    injectCSS();
    var t = document.getElementById('xa-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'xa-toast'; t.className = 'xa-toast'; t.setAttribute('role', 'status');
      document.body.appendChild(t);
    }
    t.textContent = text;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.remove(); }, 6500);
  }

  document.addEventListener('click', function (ev) {
    var el = ev.target.closest && ev.target.closest('[data-xa]');
    if (!el) {
      if (ev.target && ev.target.id === 'xa-scrim') closePanel();
      return;
    }
    var act = el.getAttribute('data-xa');
    ev.preventDefault();
    if (act === 'open') openPanel();
    else if (act === 'close') closePanel();
    else if (act === 'signin') signIn().catch(function () {});
    else if (act === 'signout') signOut();
    else if (act === 'sync' && current && current.syncNow) { current.syncNow(); closePanel(); }
  });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') closePanel(); });

  /* another tab signing in or out moves this one too (Firebase does the
     same for its own session) */
  window.addEventListener('storage', function (ev) {
    if (ev.key !== FLAG) return;
    if (ev.newValue && !listening) sdk().then(listen).catch(function () {});
  });

  function wanted() { return recall(FLAG) === '1'; }

  window.xdbAccount = {
    sdk: sdk,
    wanted: wanted,
    signIn: signIn,
    signOut: signOut,
    openPanel: openPanel,
    closePanel: closePanel,
    badgeHTML: badgeHTML,
    state: function () { return S; },
    on: function (fn) { subs.push(fn); return function () { subs = subs.filter(function (x) { return x !== fn; }); }; },
    registerTool: function (t) { current = t; paint(); },
    toast: toast
  };

  /* ---------------------------------------------------------------- boot */
  function boot() {
    injectCSS();
    paint();
    if (wanted()) { set({ status: 'checking' }); sdk().then(listen).catch(function (err) { set({ status: 'error', msg: (err && err.code) || 'offline' }); }); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
