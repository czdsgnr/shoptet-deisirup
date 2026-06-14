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

  /* ---- Košík (/kosik/): zjednodušená hlavička (logo + telefon jako podpora) ---- */
  function isCartPage() {
    return /^\/kosik(\/|$)/.test(location.pathname);
  }
  function buildCheckoutHeader() {
    if (!isCartPage()) return false;
    var wrap = document.querySelector('#header .header-top') ||
               document.querySelector('#header .navigation-wrapper');
    if (!wrap || wrap.querySelector('.dei-checkout-support')) return false;
    var box = document.createElement('div');
    box.className = 'dei-checkout-support';
    box.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.4.55 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .55 3.4 1 1 0 0 1-.24 1z"/></svg>' +
      '<span class="dei-cs-text">' +
        '<span class="dei-cs-label">Zákaznická podpora</span>' +
        '<a href="tel:+420606026880" class="dei-cs-phone">+420 606 026 880</a>' +
      '</span>';
    wrap.appendChild(box);
    document.body.classList.add('dei-checkout-ready');
    return true;
  }

  // Shoptet překresluje obsah login popupu při otevření → re-inject přes observer
  var loginObserver = null;
  function syncLogin() {
    var login = document.getElementById('login');
    if (!login) return;
    if (loginObserver) loginObserver.disconnect();
    buildLoginBenefits();
    if (!loginObserver) {
      loginObserver = new MutationObserver(syncLogin);
    }
    loginObserver.observe(login, { childList: true, subtree: true });
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    injectOpeningHours();
    syncLogin();
    buildCheckoutHeader();
    // fallback: horní lišta / login / hlavička se mohou dorenderovat později
    var tries = 0;
    var iv = setInterval(function () {
      injectOpeningHours();
      syncLogin();
      buildCheckoutHeader();
      if (++tries > 20) clearInterval(iv);
    }, 250);
  });

})();
