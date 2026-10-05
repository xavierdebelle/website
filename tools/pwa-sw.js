/* ============================================================
   INSTALLABLE TOOLS — the offline worker
   ------------------------------------------------------------
   One script, registered once per app with that app's own scope
   (tools/feed-planner, tools/carousel-planner — see pwa.js), so it
   only ever controls the app that registered it. Every other tool
   is untouched.

   Network first: online, you always get the latest version and the
   copy kept here is refreshed. Offline, or on a connection slower
   than NET_WAIT, the copy kept here opens instead.

   The apps keep their photos and layouts in the browser's own
   storage (IndexedDB / localStorage), never here; this cache holds
   only the app's files.

   To make another tool installable: add it to APPS, give it a
   manifest and icons, and load pwa.js from it with data-app.
   ============================================================ */
'use strict';

var VERSION = 'v71';
var NET_WAIT = 3500; // ms before a slow network gives way to the kept copy

var APPS = {
  'feed-planner': [
    'feed-planner.html', 'feed-planner.webmanifest', 'pwa.js',
    'icons/feed-planner-180.png', 'icons/feed-planner-192.png',
    'icons/feed-planner-512.png', 'icons/feed-planner-maskable-512.png'
  ],
  'carousel-planner': [
    'carousel-planner.html', 'carousel-planner.webmanifest', 'pwa.js',
    'icons/carousel-planner-180.png', 'icons/carousel-planner-192.png',
    'icons/carousel-planner-512.png', 'icons/carousel-planner-maskable-512.png'
  ]
};

// which app this registration belongs to, read from its scope
var APP = Object.keys(APPS).filter(function (k) {
  return self.registration.scope.slice(-k.length - 1) === '/' + k;
})[0];
var PREFIX = 'xdb-app-' + APP + '-';
var CACHE = PREFIX + VERSION;
var FILES = APP ? APPS[APP].map(function (f) { return new URL(f, self.location).href; }) : [];
var PAGE = FILES[0];

self.addEventListener('install', function (ev) {
  if (!APP) return;
  ev.waitUntil(
    caches.open(CACHE).then(function (c) {
      // 'reload' skips the browser's HTTP cache, so the kept copy is the live one
      return c.addAll(FILES.map(function (u) { return new Request(u, { cache: 'reload' }); }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (ev) {
  ev.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) {
        return k.indexOf(PREFIX) === 0 && k !== CACHE;
      }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function bare(u) { var x = new URL(u); return x.origin + x.pathname; }

self.addEventListener('fetch', function (ev) {
  var req = ev.request;
  if (!APP || req.method !== 'GET') return;
  var key = bare(req.url);
  var isPage = req.mode === 'navigate';
  // only the app's own files; anything else goes to the network untouched
  if (!isPage && FILES.indexOf(key) === -1) return;
  ev.respondWith(networkFirst(req, isPage ? PAGE : key));
});

function networkFirst(req, key) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(key).then(function (kept) {
      var net = fetch(req).then(function (res) {
        if (res && res.ok && res.type === 'basic' && !res.redirected) cache.put(key, res.clone());
        return res && res.ok ? res : (kept || res);
      });
      if (!kept) return net;
      var timeout = new Promise(function (resolve) { setTimeout(function () { resolve(kept); }, NET_WAIT); });
      return Promise.race([net.catch(function () { return kept; }), timeout]);
    });
  });
}
