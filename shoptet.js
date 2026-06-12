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

  /* ---- Přihlašovací popup: benefity + tlačítko Vytvořit účet ---- */
  var LOGIN_BENEFITS = [
    'Rychlejší objednávka bez opisování údajů',
    'Přehled všech objednávek na jednom místě',
    'Slevy a akce jen pro registrované',
    'Oblíbené příchutě uložené pro příště'
  ];

  function buildLoginBenefits() {
    var inner = document.querySelector('#login .popup-widget-inner');
    if (!inner || inner.querySelector('.dei-login-benefits')) return false;
    var login = inner.querySelector('#customerLogin');
    if (!login) return false;

    // levý sloupec = nadpis + formulář
    var main = document.createElement('div');
    main.className = 'dei-login-main';
    var heading = inner.querySelector('#loginHeading');
    if (heading) main.appendChild(heading);
    main.appendChild(login);
    inner.appendChild(main);

    // pravý sloupec = benefity + CTA
    var aside = document.createElement('aside');
    aside.className = 'dei-login-benefits';
    var items = LOGIN_BENEFITS.map(function (t) {
      return '<li>' + t + '</li>';
    }).join('');
    aside.innerHTML =
      '<h3>Nový zákazník?</h3>' +
      '<ul>' + items + '</ul>' +
      '<a class="dei-create-account" href="/registrace/" rel="nofollow">Vytvořit účet</a>';
    inner.appendChild(aside);

    inner.parentNode.classList.add('dei-login-ready');
    return true;
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    injectOpeningHours();
    buildLoginBenefits();
    // fallback: prvky se mohou dorenderovat později
    var tries = 0;
    var iv = setInterval(function () {
      injectOpeningHours();
      buildLoginBenefits();
      if (++tries > 20) clearInterval(iv);
    }, 250);
  });

})();
