/* ============================================================
   components.js
   Injeta HEADER e FOOTER idênticos em todas as páginas e
   controla o menu hambúrguer (acessível). Fonte única de
   verdade para a navegação — edite aqui uma vez só.

   IMPORTANTE: por usar injeção via JS, o site precisa rodar em
   um servidor local (ex.: `npx serve` ou Live Server). Abrir o
   .html direto (file://) funciona, pois aqui usamos innerHTML
   (não fetch), mas mantenha o servidor para o restante.
   ============================================================ */
(function () {
  "use strict";

  /* ---- Dados de contato (edite aqui) ---- */
  var WHATS_URL =
    "https://wa.me/5541999715742?text=Oi%20Mari!%20Vim%20pelo%20site%20e%20quero%20saber%20mais%20sobre%20as%20aulas.";
  var INSTAGRAM_URL = "https://instagram.com/teachermarimascarenhas";
  var EMAIL = "contato@marimascarenhas.com.br";

  /* ---- Itens de navegação ---- */
  var NAV = [
    { href: "index.html", label: "Home" },
    { href: "sobre.html", label: "Sobre" },
    { href: "metodologia.html", label: "Metodologia" },
    { href: "planos.html", label: "Planos" },
    { href: "depoimentos.html", label: "Depoimentos" }
  ];

  /* ---- Ícones inline ---- */
  var ICON = {
    whats:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02Zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>',
    mail:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    menu:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>'
  };

  /* página atual (último segmento) */
  var current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (current === "" ) current = "index.html";

  function wordmark(extraClass) {
    return (
      '<a class="wordmark ' + (extraClass || "") + '" href="index.html" aria-label="Mariana Mascarenhas — English Teacher, página inicial">' +
        '<img class="brand-logo" src="assets/logo/teacher-mari.png" width="156" height="44" alt="Mariana Mascarenhas — English Teacher" />' +
      "</a>"
    );
  }

  function navLinks(extra) {
    return NAV.map(function (item) {
      var active = item.href === current ? ' aria-current="page"' : "";
      return '<li><a href="' + item.href + '"' + active + ">" + item.label + "</a></li>";
    }).join("");
  }

  /* ---------- HEADER ---------- */
  function buildHeader() {
    return (
      '<a class="skip-link" href="#main">Pular para o conteúdo</a>' +
      '<div class="container header-inner">' +
        wordmark() +
        '<nav class="nav-desktop" aria-label="Navegação principal">' +
          "<ul>" + navLinks() + "</ul>" +
        "</nav>" +
        '<div class="header-actions">' +
          '<a class="icon-whats" href="' + WHATS_URL + '" target="_blank" rel="noopener" aria-label="Falar no WhatsApp (canal secundário)">' + ICON.whats + "</a>" +
          '<a class="btn header-cta" href="inscricao.html">Fazer pré-inscrição</a>' +
          '<button class="hamburger" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobile-panel">' +
            "<span></span><span></span><span></span>" +
          "</button>" +
        "</div>" +
      "</div>"
    );
  }

  /* ---------- MENU MOBILE ---------- */
  function buildMobileMenu() {
    return (
      '<div class="menu-overlay" data-menu-overlay hidden></div>' +
      '<aside class="mobile-panel" id="mobile-panel" aria-label="Menu" aria-hidden="true">' +
        '<div class="mobile-panel-head">' +
          wordmark() +
          '<button class="menu-close" type="button" aria-label="Fechar menu">' + ICON.close + "</button>" +
        "</div>" +
        '<nav aria-label="Navegação mobile"><ul>' + navLinks() + "</ul></nav>" +
        '<a class="btn btn--lg btn--block" href="inscricao.html">Fazer pré-inscrição</a>' +
        '<a class="btn btn--whats btn--block panel-secondary" href="' + WHATS_URL + '" target="_blank" rel="noopener">' + ICON.whats + " Falar no WhatsApp</a>" +
      "</aside>"
    );
  }

  /* ---------- FOOTER ---------- */
  function buildFooter() {
    var year = new Date().getFullYear();
    return (
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            wordmark("on-dark") +
            '<p style="margin-top:1rem;max-width:34ch;color:rgba(255,255,255,0.8)">Aulas de inglês online ao vivo, com metodologia comunicativa e um ambiente acolhedor. Seu ritmo, seus objetivos, seu plano sob medida.</p>' +
          "</div>" +
          "<div>" +
            "<h4>Navegação</h4>" +
            '<ul class="footer-list">' + navLinks() + "</ul>" +
          "</div>" +
          "<div>" +
            "<h4>Comece agora</h4>" +
            '<ul class="footer-list">' +
              '<li><a href="inscricao.html">Fazer pré-inscrição</a></li>' +
              '<li><a href="planos.html">Ver planos</a></li>' +
              '<li><a href="index.html#faq">Dúvidas frequentes</a></li>' +
            "</ul>" +
          "</div>" +
          "<div>" +
            "<h4>Contato</h4>" +
            '<ul class="footer-list">' +
              '<li><a href="' + WHATS_URL + '" target="_blank" rel="noopener">' + ICON.whats + " WhatsApp: (41) 99971-5742</a></li>" +
              '<li><a href="' + INSTAGRAM_URL + '" target="_blank" rel="noopener">' + ICON.instagram + " @teachermarimascarenhas</a></li>" +
              '<li><a href="mailto:' + EMAIL + '">' + ICON.mail + " " + EMAIL + "</a></li>" +
            "</ul>" +
          "</div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<span>© " + year + ' Mariana Mascarenhas — English Teacher. Todos os direitos reservados.</span>' +
          '<a href="politica-privacidade.html">Política de Privacidade (LGPD)</a>' +
        "</div>" +
      "</div>"
    );
  }

  /* ---------- WhatsApp flutuante ---------- */
  function buildFloat() {
    return (
      '<a class="whats-float" href="' + WHATS_URL + '" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">' +
        ICON.whats +
      "</a>"
    );
  }

  /* ---------- Inject ---------- */
  var headerEl = document.getElementById("site-header");
  var footerEl = document.getElementById("site-footer");
  if (headerEl) {
    headerEl.className = "site-header";
    headerEl.innerHTML = buildHeader() + buildMobileMenu();
  }
  if (footerEl) {
    footerEl.className = "site-footer";
    footerEl.innerHTML = buildFooter();
  }
  // botão flutuante
  var floatWrap = document.createElement("div");
  floatWrap.innerHTML = buildFloat();
  document.body.appendChild(floatWrap.firstChild);

  /* ============================================================
     COMPORTAMENTO
     ============================================================ */

  /* Header shrink + sombra ao rolar */
  var header = document.getElementById("site-header");
  var lastScrolled = null;
  function onScroll() {
    var scrolled = window.scrollY > 12;
    if (scrolled !== lastScrolled) {
      header.classList.toggle("is-scrolled", scrolled);
      lastScrolled = scrolled;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Menu hambúrguer acessível */
  var hamburger = header ? header.querySelector(".hamburger") : null;
  var panel = document.getElementById("mobile-panel");
  var overlay = document.querySelector("[data-menu-overlay]");
  var closeBtn = panel ? panel.querySelector(".menu-close") : null;
  var lastFocused = null;

  function focusables() {
    return panel.querySelectorAll('a[href], button:not([disabled])');
  }

  function openMenu() {
    lastFocused = document.activeElement;
    overlay.hidden = false;
    requestAnimationFrame(function () {
      overlay.classList.add("is-open");
      panel.classList.add("is-open");
    });
    panel.setAttribute("aria-hidden", "false");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Fechar menu");
    document.body.classList.add("no-scroll");
    var f = focusables();
    if (f.length) f[0].focus();
    document.addEventListener("keydown", onKeydown);
  }

  function closeMenu() {
    overlay.classList.remove("is-open");
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("no-scroll");
    document.removeEventListener("keydown", onKeydown);
    window.setTimeout(function () { overlay.hidden = true; }, 320);
    if (lastFocused) lastFocused.focus();
  }

  function onKeydown(e) {
    if (e.key === "Escape") { closeMenu(); return; }
    if (e.key === "Tab") {
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  if (hamburger && panel && overlay) {
    hamburger.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
    // fechar ao clicar num link
    panel.querySelectorAll("nav a, .btn").forEach(function (a) {
      a.addEventListener("click", function () { closeMenu(); });
    });
    // se redimensionar para desktop com menu aberto
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 980 && panel.classList.contains("is-open")) closeMenu();
    });
  }
})();
