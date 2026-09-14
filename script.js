/* ==========================================================================
   ImageWorks Creative — Footer
   ==========================================================================

   Two jobs:

   1. The newsletter form. There is no mailing list behind this review page,
      so a valid address gets a confirmation in place and an invalid one gets
      told why, instead of the page reloading to "#".

   2. The cookie notice. Shown until Accept is pressed; the answer is kept
      in sessionStorage so it comes back in a new tab, which is what you
      want while reviewing. Swap sessionStorage for localStorage below and
      it sticks across visits, like it will on the live site.

   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     1. Newsletter
     --------------------------------------------------------------------- */
  var form  = document.querySelector('.news__form');
  var input = document.querySelector('.news__input');
  var msg   = document.querySelector('.news__msg');

  if (form && input && msg) {
    var say = function (text, isError) {
      msg.textContent = text;
      msg.classList.toggle('news__msg--error', !!isError);
      input.setAttribute('aria-invalid', isError ? 'true' : 'false');
    };

    input.addEventListener('input', function () {
      if (input.getAttribute('aria-invalid') === 'true' && input.validity.valid) say('');
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (input.validity.valueMissing) {
        say('Enter your email address to subscribe.', true);
        input.focus();
        return;
      }
      if (!input.validity.valid) {
        say('That does not look like an email address.', true);
        input.focus();
        return;
      }

      say('Thanks — you’re on the list.');
      form.reset();
    });
  }


  /* ---------------------------------------------------------------------
     2. Cookie notice
     --------------------------------------------------------------------- */
  var bar    = document.querySelector('.cookie');
  var accept = document.querySelector('.cookie__btn');
  var KEY    = 'iwc-cookies-accepted';

  if (bar && accept) {
    // Storage can throw (private mode, blocked site data); treat that as
    // "not accepted" and just don't remember the answer.
    var store = null;
    try { store = window.sessionStorage; } catch (e) {}

    var accepted = false;
    try { accepted = !!store && store.getItem(KEY) === '1'; } catch (e) {}

    if (!accepted) bar.hidden = false;

    accept.addEventListener('click', function () {
      try { if (store) store.setItem(KEY, '1'); } catch (e) {}

      var done = function () { bar.hidden = true; };

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        done();
        return;
      }
      bar.classList.add('cookie--leaving');
      bar.addEventListener('transitionend', done, { once: true });
      setTimeout(done, 500);   // in case the transition never fires
    });
  }
})();
