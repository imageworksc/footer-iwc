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
    const panel  = document.querySelector('.cookie');
    const accept = panel?.querySelector('.cookie__btn');
    if (!panel || !accept) return;

    const KEY     = 'iwc-cookies-accepted';
    const STORE   = 'sessionStorage';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

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

    // ---- in ----
    const show = () => {
      panel.hidden = false;
      // two frames: one for the display change to land, one for the
      // transition to have something to start from
      requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add('is-in')));
    };

    // ---- out ----
    let gone = false;
    const hide = () => {
      if (gone) return;
      gone = true;
      panel.hidden = true;
    };

    if (!remembered()) show();

    accept.addEventListener('click', () => {
      remember();
      if (reduced.matches) {
        hide();
        return;
      }
      panel.classList.remove('is-in');
      // transitionend bubbles up from the button's own transition too, so
      // only the panel's counts
      panel.addEventListener('transitionend', (event) => {
        if (event.target === panel) hide();
      });
      setTimeout(hide, 400);   // in case the transition never fires
    });
  };

  initCookieNotice();
})();
