/* ============================================================
   deisirup – Shoptet custom JS
   Hosting: GitHub Pages (czdsgnr/shoptet-deisirup)
   Deploy:  edit → commit → push → ~1-2 min build → refresh
   ============================================================ */
(function () {
  'use strict';

  /* ---- Otevírací doba vedle telefonu v horní liště ---- */
  function injectOpeningHours() {
    var contacts = document.querySelector('.top-navigation-contacts');
    if (!contacts || contacts.querySelector('.dei-opening-hours')) return false;
    var phone = contacts.querySelector('.project-phone');
    var el = document.createElement('span');
    el.className = 'dei-opening-hours';
    el.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7v5l3 2" /><circle cx="12" cy="12" r="9" /></svg>' +
      '<span>Po–Pá 8:00–16:30</span>';
    if (phone && phone.parentNode === contacts) {
      contacts.insertBefore(el, phone.nextSibling);
    } else {
      contacts.appendChild(el);
    }
    return true;
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    if (injectOpeningHours()) return;
    // fallback: lišta se může dorenderovat později
    var tries = 0;
    var iv = setInterval(function () {
      if (injectOpeningHours() || ++tries > 20) clearInterval(iv);
    }, 250);
  });

})();
