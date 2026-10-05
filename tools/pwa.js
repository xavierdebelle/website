/* ============================================================
   INSTALLABLE TOOLS — the page side
   ------------------------------------------------------------
   <script src="pwa.js" data-app="feed-planner" defer></script>

   - registers pwa-sw.js for this app only (scope tools/<app>), which
     keeps the app's files so it opens offline;
   - shows the page's [data-pwa-install] button when the app can be
     installed: Chrome, Edge and Android get the browser's own install
     prompt; iPhone and iPad get a note on how to add it to the Home
     Screen, since Safari has no prompt;
   - once installed, asks the browser to keep the app's saved photos
     and layouts even when the device runs low on space;
   - for pages that draw their own buttons (Idea Bank's Manage menu):
     window.xdbPwa.can() / .install(), and an 'xdb-pwa' event on window
     whenever the answer to can() changes.
   ============================================================ */
(function () {
  'use strict';
  var me = document.currentScript;
  var APP = me && me.getAttribute('data-app');
  if (!APP) return;

  var standalone = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) ||
                   navigator.standalone === true;
  var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('pwa-sw.js', { scope: './' + APP }).catch(function () {});
    });
  }

  if (standalone && navigator.storage && navigator.storage.persist) {
    navigator.storage.persisted().then(function (p) { if (!p) return navigator.storage.persist(); }).catch(function () {});
  }

  var prompt = null;
  function btn() { return document.querySelector('[data-pwa-install]'); }
  function show(on) {
    var b = btn(); if (b) b.style.display = on ? '' : 'none';
    try { window.dispatchEvent(new Event('xdb-pwa')); } catch (e) {}
  }
  function install() {
    if (prompt) {
      prompt.prompt();
      prompt.userChoice.then(function () { prompt = null; show(false); });
    } else if (ios) {
      iosNote();
    }
  }
  window.xdbPwa = {
    can: function () { return !standalone && (!!prompt || ios); },
    install: function () { install(); },
    standalone: standalone
  };

  window.addEventListener('beforeinstallprompt', function (ev) {
    ev.preventDefault();          // the page's own button replaces the browser's banner
    prompt = ev;
    show(true);
  });
  window.addEventListener('appinstalled', function () { prompt = null; show(false); });

  function iosNote() {
    if (document.getElementById('pwa-note')) return;
    var n = document.createElement('div');
    n.id = 'pwa-note';
    n.setAttribute('role', 'dialog');
    n.setAttribute('aria-label', 'Install this app');
    n.style.cssText = 'position:fixed;left:12px;right:12px;bottom:calc(14px + env(safe-area-inset-bottom));z-index:9999;' +
      'max-width:420px;margin:0 auto;padding:16px 44px 16px 18px;border:1px solid var(--line,#d9d4c9);' +
      'background:var(--surface,#fff);color:var(--ink,#201e1c);font:14px/1.5 var(--font-ui,-apple-system,sans-serif);' +
      'box-shadow:0 10px 30px rgba(0,0,0,.18);border-radius:var(--radius-s,3px)';
    n.innerHTML = '<b style="display:block;margin-bottom:4px">Install this app</b>' +
      'Tap <b>Share</b> <span aria-hidden="true">&#x2191;&#xFE0E;</span> in Safari, then <b>Add to Home Screen</b>. ' +
      'It opens like an app and works offline.' +
      '<br><span style="color:var(--ink-dim,#726b62);font-size:12px">The installed app keeps its own copy of your work, separate from Safari.</span>' +
      '<button type="button" aria-label="Close" style="position:absolute;top:6px;right:6px;width:34px;height:34px;border:0;background:none;' +
      'color:inherit;font-size:22px;line-height:1;cursor:pointer">&times;</button>';
    n.querySelector('button').addEventListener('click', function () { n.remove(); });
    document.body.appendChild(n);
  }

  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-pwa-install]');
    if (!b) return;
    ev.preventDefault();
    install();
  });

  // Safari never fires beforeinstallprompt: on an iPhone or iPad not yet
  // running the installed app, the button opens the Home Screen note instead.
  if (ios && !standalone) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { show(true); });
    else show(true);
  }
})();
