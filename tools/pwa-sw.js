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

   The synced apps (Budget Tracker, Project Phases, Idea Bank) also
   need code from outside the site: the Firebase library, React for
   Idea Bank, and fonts. Those are kept in one shared cache (LIB)
   that survives version bumps: the library URLs carry their version
   number, so a kept copy never goes stale. Font stylesheets are
   refreshed in the background. Database traffic itself is never
   touched here; the tools keep working on the device and sync when
   the connection is back.

   To make another tool installable: add it to APPS, give it a
   manifest and icons, and load pwa.js from it with data-app.
   ============================================================ */
'use strict';

var VERSION = 'v77';
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
  ],
  'budget-tracker': [
    'budget-tracker.html', 'budget-tracker.webmanifest', 'pwa.js', '../assets/account.js',
    'icons/budget-tracker-180.png', 'icons/budget-tracker-192.png',
    'icons/budget-tracker-512.png', 'icons/budget-tracker-maskable-512.png'
  ],
  'project-tracker': [
    'project-tracker.html', 'project-tracker.webmanifest', 'pwa.js', '../assets/account.js',
    'icons/project-tracker-180.png', 'icons/project-tracker-192.png',
    'icons/project-tracker-512.png', 'icons/project-tracker-maskable-512.png'
  ],
  'idea-bank': [
    'idea-bank.html', 'idea-bank.webmanifest', 'pwa.js', '../assets/account.js', '../assets/logo.svg',
    'idea-bank/support.js', 'idea-bank/idea-bank-sync.js',
    'idea-bank/_ds/xavier-de-belle-website-a7c85075-e389-43a8-89e9-7fca43266e85/_ds_bundle.css',
    'idea-bank/_ds/xavier-de-belle-website-a7c85075-e389-43a8-89e9-7fca43266e85/_ds_bundle.js',
    'idea-bank/_ds/xavier-de-belle-website-a7c85075-e389-43a8-89e9-7fca43266e85/styles.css',
    'icons/idea-bank-180.png', 'icons/idea-bank-192.png',
    'icons/idea-bank-512.png', 'icons/idea-bank-maskable-512.png'
  ],
  'notes': [
    'notes.html', 'notes.webmanifest', 'pwa.js', '../assets/account.js', '../assets/logo.svg',
    'icons/notes-180.png', 'icons/notes-192.png', 'icons/notes-512.png', 'icons/notes-maskable-512.png'
  ],
  'journal': [
    'journal.html', 'journal.webmanifest', 'pwa.js', '../assets/account.js', '../assets/logo.svg',
    'icons/journal-180.png', 'icons/journal-192.png', 'icons/journal-512.png', 'icons/journal-maskable-512.png'
  ],
  'kitchen': [
    'kitchen.html', 'kitchen.webmanifest', 'pwa.js', '../assets/account.js', '../assets/logo.svg',
    'icons/kitchen-180.png', 'icons/kitchen-192.png', 'icons/kitchen-512.png', 'icons/kitchen-maskable-512.png'
  ],
  'cards': [
    'cards.html', 'cards.webmanifest', 'pwa.js', '../assets/account.js', '../assets/logo.svg',
    'icons/cards-180.png', 'icons/cards-192.png', 'icons/cards-512.png', 'icons/cards-maskable-512.png'
  ]
};

// Outside code each app needs offline, fetched when the app is installed.
var FIREBASE = ['firebase-app.js', 'firebase-auth.js', 'firebase-database.js'].map(function (f) {
  return 'https://www.gstatic.com/firebasejs/10.12.2/' + f;
});
var LIBS = {
  'budget-tracker': FIREBASE.concat([
    'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;600;700;800&display=swap'
  ]),
  'project-tracker': FIREBASE.concat([
    'https://use.typekit.net/zxm4vjv.css',
    'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800&display=swap'
  ]),
  'idea-bank': FIREBASE.concat([
    'https://unpkg.com/react@18.3.1/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js',
    'https://unpkg.com/@babel/standalone@7.29.0/babel.min.js'
  ]),
  'notes': FIREBASE,
  'journal': FIREBASE,
  'kitchen': FIREBASE,
  // the barcode drawer and the barcode reader for iPhone/Safari
  'cards': FIREBASE.concat([
    'https://unpkg.com/bwip-js@4.11.4/dist/bwip-js-min.js',
    'https://unpkg.com/@zxing/library@0.23.0/umd/index.min.js'
  ])
};
var LIB = 'xdb-app-lib';
// versioned code and font files: keep the first copy
var KEEP = ['https://www.gstatic.com/firebasejs/', 'https://unpkg.com/', 'https://fonts.gstatic.com/', 'https://use.typekit.net/af/'];
// font stylesheets: answer from the kept copy, refresh it in the background
var FRESHEN = ['https://fonts.googleapis.com/', 'https://use.typekit.net/'];
function starts(u, list) { return list.some(function (p) { return u.indexOf(p) === 0; }); }

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
    }).then(function () {
      // outside code is best effort: one slow CDN must not stop the install
      var libs = LIBS[APP] || [];
      return caches.open(LIB).then(function (c) {
        return Promise.all(libs.map(function (u) {
          return c.match(u).then(function (kept) {
            if (kept) return;
            return fetch(u, { mode: 'cors', credentials: 'omit' }).then(function (res) {
              if (res && res.ok) return c.put(u, res);
            }).catch(function () {});
          });
        }));
      });
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
  if (!isPage && (starts(req.url, KEEP) || starts(req.url, FRESHEN))) {
    ev.respondWith(fromLib(req, starts(req.url, FRESHEN)));
    return;
  }
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

function fromLib(req, freshen) {
  return caches.open(LIB).then(function (cache) {
    return cache.match(req.url).then(function (kept) {
      var net = fetch(req).then(function (res) {
        if (res && (res.ok || res.type === 'opaque')) cache.put(req.url, res.clone());
        return res;
      });
      if (kept) { if (freshen) net.catch(function () {}); return kept; }
      return net;
    });
  });
}
