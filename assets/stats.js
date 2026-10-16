/* =========================================================
   XAVIER DE BELLE — visit counts (Umami Cloud, no cookies)
   One tag on every page:  <script defer src="assets/stats.js"></script>

   - Counts page views on xavierdebelle.com only (not local copies).
   - Never counts Xavier: account.js sets localStorage "umami.disabled"
     on any device where he signs in.
   - Counts clicks on email, phone and outside links on every page.
   - Pages report their own actions with xdbTrack('name', { … }).
   ========================================================= */
(function () {
  'use strict';
  if (window.xdbTrack) return;

  var ID = '079ecd5c-5252-4fea-b62c-407fe49e22eb';
  var HOST = 'xavierdebelle.com';

  function off() {
    try { return localStorage.getItem('umami.disabled') === '1'; } catch (e) { return false; }
  }

  window.xdbTrack = function (name, data) {
    try { if (window.umami && !off()) window.umami.track(name, data); } catch (e) {}
  };

  if (location.hostname !== HOST || off()) return;

  var s = document.createElement('script');
  s.defer = true;
  s.src = 'https://cloud.umami.is/script.js';
  s.setAttribute('data-website-id', ID);
  s.setAttribute('data-domains', HOST);
  document.head.appendChild(s);

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var page = location.pathname;
    if (/^mailto:/i.test(href)) { window.xdbTrack('email-click', { page: page }); return; }
    if (/^(tel|sms):/i.test(href)) { window.xdbTrack('phone-click', { page: page }); return; }
    if (a.host && a.host !== location.host && /^https?:$/.test(a.protocol)) {
      window.xdbTrack('outbound', { to: a.host.replace(/^www\./, ''), page: page });
    }
  }, true);
})();
