/* ============================================================
   XAVIER DE BELLE — the Index, on every page
   ------------------------------------------------------------
   Pages carry two buttons in their top bar: Index and the account.
   Index opens the same list of the whole site that the map's own Index
   button shows. The list is read from index.html itself, so there is one
   list to maintain, never two.
   ============================================================ */
(function () {
  'use strict';
  var ROOT = (function () {
    var s = document.currentScript && document.currentScript.src;
    return s ? s.replace(/assets\/site-index\.js(\?.*)?$/, '') : '';
  })();

  /* if the map can't be read (offline, say), a short list still works */
  var FALLBACK =
    '<div class="index__col"><h3>The Site</h3>' +
    '<a href="' + ROOT + 'work.html">Work</a><a href="' + ROOT + 'tools.html">Tools</a>' +
    '<a href="' + ROOT + 'food-for-thought.html">Food for Thought</a><a href="' + ROOT + 'changelog.html">What’s New</a></div>';

  var gridP = null, lastFocus = null;
  function grid() {
    if (gridP) return gridP;
    gridP = fetch(ROOT + 'index.html', { credentials: 'same-origin' }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    }).then(function (html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var g = doc.querySelector('#index-view .index__grid');
      if (!g) throw new Error('no index');
      // links in index.html are relative to the site root
      Array.prototype.forEach.call(g.querySelectorAll('a[href]'), function (a) {
        var h = a.getAttribute('href');
        if (!/^([a-z]+:|#|\/)/i.test(h)) a.setAttribute('href', ROOT + h);
      });
      return g.innerHTML;
    }).catch(function () { gridP = null; return FALLBACK; });
    return gridP;
  }

  function open() {
    if (document.getElementById('sidx')) return;
    lastFocus = document.activeElement;
    var el = document.createElement('section');
    el.className = 'sidx';
    el.id = 'sidx';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Index of the whole site');
    el.innerHTML =
      '<div class="sidx__top"><div>' +
        '<h2 class="sidx__h">The <span class="volt">Index</span></h2>' +
        '<p class="kicker">Everything on this site, as a plain list</p></div>' +
        '<div class="sidx__acts"><a class="topbar__btn" href="' + ROOT + 'index.html">The Map</a>' +
        '<button class="topbar__btn" type="button" data-sidx-close>Close</button></div></div>' +
      '<div class="index__grid sidx__grid"><div class="index__col"><h3>Loading</h3></div></div>';
    document.body.appendChild(el);
    document.documentElement.classList.add('sidx-on');
    var close = el.querySelector('[data-sidx-close]');
    try { close.focus(); } catch (e) {}
    grid().then(function (html) {
      var g = el.querySelector('.sidx__grid');
      if (g) g.innerHTML = html;
    });
  }
  function close() {
    var el = document.getElementById('sidx');
    if (!el) return;
    el.remove();
    document.documentElement.classList.remove('sidx-on');
    if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) {}
  }

  document.addEventListener('click', function (ev) {
    var t = ev.target.closest && ev.target.closest('[data-site-index], [data-sidx-close]');
    if (!t) return;
    ev.preventDefault();
    if (t.hasAttribute('data-site-index')) open(); else close();
  });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') close(); });
  // warm the list after the page settles, so Index opens instantly
  window.addEventListener('load', function () { setTimeout(grid, 1500); });
})();
