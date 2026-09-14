/* ==========================================================================
   ImageWorks Creative — Footer
   ==========================================================================

   One job: the newsletter form. There is no mailing list behind this review
   page, so a valid address gets a confirmation in place and an invalid one
   gets told why, instead of the page reloading to "#".

   ========================================================================== */

(function () {
  'use strict';

  var form  = document.querySelector('.news__form');
  var input = document.querySelector('.news__input');
  var msg   = document.querySelector('.news__msg');
  if (!form || !input || !msg) return;

  function say(text, isError) {
    msg.textContent = text;
    msg.classList.toggle('news__msg--error', !!isError);
    input.setAttribute('aria-invalid', isError ? 'true' : 'false');
  }

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
})();
