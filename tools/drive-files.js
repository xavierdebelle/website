/* ============================================================
   Drive files — attach documents to things in a tool
   ------------------------------------------------------------
   Used by Project Phases (project + meeting notes) and Pipelines
   (cards). Files go from the browser straight into the signed-in
   person's own Google Drive, under "<Tool> / <project or pipeline>".
   The tool keeps only a small record of each file:
     { id, name, mime, size, at, link, shared }
   Removing a file in a tool removes that record; the file stays in
   Drive.

   Same Google setup as Video Review (project xdb-tools, Drive API on,
   the drive.file scope): drive.file lets these pages see only the
   files they created, nothing else in the Drive. New files are
   private; share(id, true) adds "Anyone with the link can view",
   share(id, false) takes it away.

   Google's permission popup needs a click to open. A token lasts an
   hour; when the popup is blocked, upload() fails with
   err.needsClick — the tool then shows a "Connect Google Drive"
   button that retries from a real click.
   ============================================================ */
(function () {
  'use strict';
  var CLIENT_ID = '6009567091-jmgffgoj2v4gf2fb355a04pag4dgev1h.apps.googleusercontent.com';   // same as Video Review
  var SCOPE = 'https://www.googleapis.com/auth/drive.file';
  var FIELDS = 'id,name,mimeType,size,webViewLink';
  var gisP = null, tok = null, tokExp = 0;

  function loadGIS() {
    return gisP || (gisP = new Promise(function (res, rej) {
      if (window.google && google.accounts && google.accounts.oauth2) return res();
      var s = document.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client'; s.async = true;
      s.onload = res;
      s.onerror = function () { gisP = null; rej(new Error('Google’s sign-in script didn’t load — are you online?')); };
      document.head.appendChild(s);
    }));
  }
  function hint() {
    try { var S = window.xdbAccount && xdbAccount.state(); return (S && S.user && S.user.email) || undefined; } catch (e) { return undefined; }
  }
  function hasToken() { return !!tok && Date.now() < tokExp - 120000; }
  function token() {
    if (hasToken()) return Promise.resolve(tok);
    return loadGIS().then(function () {
      return new Promise(function (res, rej) {
        var c = google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID, scope: SCOPE, hint: hint(),
          callback: function (r) {
            if (r.error) return rej(new Error(r.error === 'access_denied' ? 'Drive permission wasn’t given' : 'Drive said ' + r.error));
            tok = r.access_token; tokExp = Date.now() + r.expires_in * 1000; res(tok);
          },
          error_callback: function (e) {
            var err = new Error(e && e.type === 'popup_closed' ? 'The Google window was closed' : 'Google’s permission window was blocked');
            if (e && e.type === 'popup_failed_to_open') err.needsClick = true;
            rej(err);
          }
        });
        c.requestAccessToken({ prompt: '' });
      });
    });
  }
  function gfetch(url, opt) {
    return token().then(function (t) {
      opt = opt || {};
      var h = Object.assign({ Authorization: 'Bearer ' + t }, opt.headers || {});
      return fetch(url, Object.assign({}, opt, { headers: h }));
    }).then(function (r) {
      if (r.status === 401) { tok = null; }
      if (!r.ok && r.status !== 204) throw new Error('Google Drive said ' + r.status);
      return r;
    });
  }
  function q(s) { return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }

  /* A folder path like ['Project Phases', 'Client website'], created as
     needed. Each level's id is remembered on this device (by `key`, so a
     renamed project keeps its folder). */
  function remember(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function child(parent, name, key) {
    var k = 'xdb.drive.folder.' + key, cached = remember(k);
    var check = cached ? gfetch('https://www.googleapis.com/drive/v3/files/' + cached + '?fields=id,trashed')
      .then(function (r) { return r.json(); }).then(function (j) { return j.trashed ? null : j.id; }, function () { return null; }) : Promise.resolve(null);
    return check.then(function (id) {
      if (id) return id;
      var query = "name='" + q(name) + "' and mimeType='application/vnd.google-apps.folder' and trashed=false" + (parent ? " and '" + parent + "' in parents" : '');
      return gfetch('https://www.googleapis.com/drive/v3/files?q=' + encodeURIComponent(query) + '&fields=files(id)')
        .then(function (r) { return r.json(); })
        .then(function (found) {
          if (found.files && found.files[0]) return found.files[0].id;
          var meta = { name: name, mimeType: 'application/vnd.google-apps.folder' };
          if (parent) meta.parents = [parent];
          return gfetch('https://www.googleapis.com/drive/v3/files?fields=id', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(meta) })
            .then(function (r) { return r.json(); }).then(function (j) { return j.id; });
        })
        .then(function (id) { remember(k, id); return id; });
    });
  }
  function folder(path) {      // path: [{ name, key }, …]
    return path.reduce(function (p, lvl) { return p.then(function (parent) { return child(parent, lvl.name, lvl.key); }); }, Promise.resolve(null));
  }

  // resumable upload in 8 MB pieces, picking up where it left off after a drop
  function put(session, file, at, end) {
    return new Promise(function (resolve) {
      var x = new XMLHttpRequest();
      x.open('PUT', session);
      x.setRequestHeader('Content-Range', end == null ? 'bytes */' + file.size : 'bytes ' + at + '-' + (end - 1) + '/' + file.size);
      if (end != null && put.onprogress) x.upload.onprogress = function (e) { put.onprogress(at + e.loaded); };
      x.onload = function () { resolve({ status: x.status, range: x.getResponseHeader('Range'), body: x.responseText }); };
      x.onerror = function () { resolve({ status: 0 }); };
      x.send(end == null ? null : file.slice(at, end));
    });
  }
  function upload(file, path, onProgress) {
    var say = onProgress || function () {};
    if (!file.size) return Promise.reject(new Error('“' + file.name + '” is empty'));
    say(0, 'Connecting to Google Drive…');
    return folder(path).then(function (parent) {
      return gfetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=' + FIELDS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8', 'X-Upload-Content-Type': file.type || 'application/octet-stream', 'X-Upload-Content-Length': String(file.size) },
        body: JSON.stringify({ name: file.name, parents: [parent] })
      });
    }).then(function (init) {
      var session = init.headers.get('Location');
      if (!session) throw new Error('Google Drive didn’t open an upload');
      var CHUNK = 32 * 256 * 1024, at = 0, tries = 0;
      put.onprogress = function (n) { say(file.size ? n / file.size : 1, 'Uploading ' + file.name + ' — ' + mb(n) + ' / ' + mb(file.size) + ' MB'); };
      function step() {
        var end = Math.min(file.size, at + CHUNK);
        return put(session, file, at, end).then(function (res) {
          if (res.status === 200 || res.status === 201) return JSON.parse(res.body);
          if (res.status === 308) { at = after(res.range, end); tries = 0; return step(); }
          if (++tries > 5) throw new Error('the connection keeps dropping');
          say(at / (file.size || 1), 'Connection hiccup — retrying…');
          return wait(1500 * tries).then(function () { return put(session, file, 0, null); }).then(function (st) {
            if (st.status === 200 || st.status === 201) return JSON.parse(st.body);
            if (st.status === 308) at = after(st.range, 0);
            return step();
          });
        });
      }
      return step();
    }).then(function (d) {
      say(1, 'Uploaded ' + file.name);
      return { id: d.id, name: d.name || file.name, mime: d.mimeType || file.type || '', size: +d.size || file.size || 0,
               at: Date.now(), link: d.webViewLink || 'https://drive.google.com/file/d/' + d.id + '/view', shared: false };
    });
  }
  function after(range, fallback) { var m = range && range.match(/-(\d+)$/); return m ? +m[1] + 1 : fallback; }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function mb(n) { return (n / 1048576).toFixed(n > 1e9 ? 0 : 1); }

  // "Anyone with the link can view" on or off
  function share(id, on) {
    var base = 'https://www.googleapis.com/drive/v3/files/' + id + '/permissions';
    if (on) return gfetch(base + '?fields=id', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role: 'reader', type: 'anyone' }) });
    return gfetch(base + '/anyoneWithLink', { method: 'DELETE' }).catch(function (e) {
      if (/ 404$/.test(e.message)) return null;     // already private
      throw e;
    });
  }

  // a file chooser from a click; resolves with the chosen files (maybe none)
  function choose() {
    return new Promise(function (res) {
      var inp = document.createElement('input');
      inp.type = 'file'; inp.multiple = true; inp.style.display = 'none';
      inp.addEventListener('change', function () { res(Array.prototype.slice.call(inp.files || [])); inp.remove(); });
      inp.addEventListener('cancel', function () { res([]); inp.remove(); });
      document.body.appendChild(inp);
      inp.click();
    });
  }

  function size(n) {
    if (!n) return '';
    if (n < 1024) return n + ' B';
    if (n < 1048576) return Math.round(n / 1024) + ' KB';
    return (n / 1048576).toFixed(n < 10485760 ? 1 : 0) + ' MB';
  }
  // a stored file record, tidied (the database may drop empty values)
  function norm(f) {
    if (!f || typeof f.id !== 'string' || !/^[\w-]{10,}$/.test(f.id)) return null;
    return { id: f.id, name: String(f.name || 'File'), mime: String(f.mime || ''), size: +f.size || 0, at: +f.at || 0,
             link: /^https:\/\/(drive|docs)\.google\.com\//.test(f.link) ? f.link : 'https://drive.google.com/file/d/' + f.id + '/view',
             shared: !!f.shared };
  }
  function list(v) {
    var a = Array.isArray(v) ? v : (v && typeof v === 'object' ? Object.keys(v).map(function (k) { return v[k]; }) : []);
    return a.map(norm).filter(Boolean);
  }

  window.xdbDrive = { preload: function () { loadGIS().catch(function () {}); }, hasToken: hasToken, token: token,
                      upload: upload, share: share, choose: choose, size: size, list: list };
})();
