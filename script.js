/* ==========================================================================
   ImageWorks Creative — Footer
   ==========================================================================

   Two behaviours, each in its own function, wired up at the bottom:

     1. Newsletter — there is no mailing list behind this review page, so a
        valid address gets a confirmation in place and an invalid one gets
        told why, instead of the page reloading to "#".

     2. Cookie notice — shown until Accept is pressed; the answer is kept in
        sessionStorage so it comes back in a new tab, which is what you want
        while reviewing. Swap sessionStorage for localStorage in STORE below
        and it sticks across visits, like it will on the live site.

   Plain script, no build step. Everything it touches is looked up by class,
   and each behaviour bows out quietly if its markup is not on the page.

   ========================================================================== */

(() => {
  'use strict';


  /* ========================================================================
     1. NEWSLETTER
     ======================================================================== */
  const initNewsletter = () => {
    const form    = document.querySelector('.news__form');
    const input   = form?.querySelector('.news__input');
    const message = form?.querySelector('.news__msg');
    if (!form || !input || !message) return;

    const say = (text, isError = false) => {
      message.textContent = text;
      message.classList.toggle('news__msg--error', isError);
      input.setAttribute('aria-invalid', String(isError));
    };

    // Clear the error as soon as the address becomes valid, not on submit.
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true' && input.validity.valid) say('');
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const { valueMissing, valid } = input.validity;

      if (valueMissing) {
        say('Enter your email address to subscribe.', true);
        input.focus();
        return;
      }
      if (!valid) {
        say('That does not look like an email address.', true);
        input.focus();
        return;
      }

      say('Thanks — you’re on the list.');
      form.reset();
    });
  };


  /* ========================================================================
     2. COOKIE NOTICE
     ======================================================================== */
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


  /* ========================================================================
     WIRE UP
     ======================================================================== */
  initNewsletter();
  initCookieNotice();
})();
