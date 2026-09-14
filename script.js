/* ==========================================================================
   ImageWorks Creative — Footer
   ==========================================================================

   One behaviour: the cookie notice. It is shown until Accept is pressed;
   the answer is kept in sessionStorage so it comes back in a new tab,
   which is what you want while reviewing. Swap sessionStorage for
   localStorage in STORE below and it sticks across visits, like it will
   on the live site.

   Plain script, no build step. Everything it touches is looked up by class,
   and it bows out quietly if its markup is not on the page.

   ========================================================================== */

(() => {
  'use strict';

  const initCookieNotice = () => {
    const bar    = document.querySelector('.cookie');
    const accept = bar?.querySelector('.cookie__btn');
    if (!bar || !accept) return;

    const KEY   = 'iwc-cookies-accepted';
    const STORE = 'sessionStorage';

    // Storage can throw (private mode, blocked site data); treat that as
    // "not accepted" and simply don't remember the answer.
    const remembered = () => {
      try { return window[STORE].getItem(KEY) === '1'; }
      catch { return false; }
    };
    const remember = () => {
      try { window[STORE].setItem(KEY, '1'); }
      catch { /* nothing to do: the notice will just show again */ }
    };

    if (!remembered()) bar.hidden = false;

    accept.addEventListener('click', () => {
      remember();
      const hide = () => { bar.hidden = true; };

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        hide();
        return;
      }
      bar.classList.add('cookie--leaving');
      bar.addEventListener('transitionend', hide, { once: true });
      setTimeout(hide, 500);   // in case the transition never fires
    });
  };

  initCookieNotice();
})();
