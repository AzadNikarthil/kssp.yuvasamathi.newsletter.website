(function () {
  'use strict';

  var NAV_HTML = ''
    + '<div class="site-nav-inner">'
    +   '<a class="site-nav-brand" href="/">'
    +     '<span class="mark" aria-hidden="true"><img src="/images/Yuvasamathi_log.jpeg" alt="" width="48" height="48"></span>'
    +     '<span>'
    +       '<span class="org-ml">KSSP യുവസമിതി</span>'
    +       '<span class="org-en" lang="en">KSSP Yuvasamithi · Newsletter</span>'
    +     '</span>'
    +   '</a>'
    +   '<nav class="site-nav-links" aria-label="Primary">'
    +     '<a href="/" data-nav="home">ഹോം</a>'
    +     '<a href="/archive/" data-nav="archive">ആർക്കൈവ്</a>'
    +     '<a href="/about/" data-nav="about">കുറിച്ച്</a>'
    +   '</nav>'
    + '</div>';

  // When the latest issue changes, update LATEST_ISSUE_URL here and in issues.json.
  var LATEST_ISSUE_URL = '/issues/2026-april/';

  var FOOTER_HTML = ''
    + '<div class="site-footer-inner">'
    +   '<div>'
    +     '<h4>KSSP Yuvasamithi</h4>'
    +     '<p class="slogan-ml">ശാസ്ത്രം സാമൂഹ്യവിപ്ലവത്തിന്</p>'
    +     '<p class="slogan-en" lang="en">Science for Social Revolution</p>'
    +     '<p class="fine">Kerala Shastra Sahitya Parishath · Yuvasamithi</p>'
    +   '</div>'
    +   '<div class="site-footer-links">'
    +     '<h4>Newsletter</h4>'
    +     '<a href="' + LATEST_ISSUE_URL + '">Latest issue</a>'
    +     '<a href="/archive/">Archive</a>'
    +     '<a href="/about/">About us</a>'
    +   '</div>'
    +   '<div class="site-footer-links">'
    +     '<h4>Contact</h4>'
    +     '<a href="mailto:yuvasamithi@ksspkerala.org">yuvasamithi@ksspkerala.org</a>'
    +   '</div>'
    + '</div>';

  function currentPageKey() {
    var p = location.pathname;
    if (p === '/' || p === '/index.html') return 'home';
    if (p.indexOf('/archive') === 0) return 'archive';
    if (p.indexOf('/about') === 0) return 'about';
    return null;
  }

  function mount() {
    var nav = document.querySelector('header.site-nav');
    if (nav && !nav.firstElementChild) {
      nav.innerHTML = NAV_HTML;
      var key = currentPageKey();
      if (key) {
        var link = nav.querySelector('[data-nav="' + key + '"]');
        if (link) link.setAttribute('aria-current', 'page');
      }
    }
    var footer = document.querySelector('footer.site-footer');
    if (footer && !footer.firstElementChild) {
      footer.innerHTML = FOOTER_HTML;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
