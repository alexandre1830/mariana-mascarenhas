/* ============================================================
   main.js
   Interações: scroll reveal, contadores, acordeão, carrossel,
   validação do formulário + envio (Formspree) e estados.
   ============================================================ */
(function () {
  "use strict";

  /* ============================================================
     CONFIG DO FORMULÁRIO
     Cole aqui a URL do seu form no Formspree:
     https://formspree.io/f/XXXXXXXX
     Enquanto estiver vazio, o envio usa um modo de demonstração
     (mostra a tela de sucesso sem enviar de verdade).
     ============================================================ */
  var FORM_ENDPOINT = ""; // <-- ex.: "https://formspree.io/f/abcdwxyz"

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================================================
     1) SCROLL REVEAL (IntersectionObserver, com stagger)
     ============================================================ */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    // stagger por grupo (elementos irmãos com .reveal)
    items.forEach(function (el) {
      if (el.style.getPropertyValue("--reveal-delay")) { io.observe(el); return; }
      var siblings = Array.prototype.filter.call(
        el.parentElement ? el.parentElement.children : [],
        function (c) { return c.classList && c.classList.contains("reveal"); }
      );
      var idx = siblings.indexOf(el);
      if (idx > 0) el.style.setProperty("--reveal-delay", Math.min(idx, 6) * 80 + "ms");
      io.observe(el);
    });
  }

  /* ============================================================
     2) CONTADORES ANIMADOS
     Use data-count="9" e opcional data-suffix / data-prefix.
     Para valores não numéricos, deixe o texto direto (sem data-count).
     ============================================================ */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    if (isNaN(target)) return;
    if (prefersReduced) { el.textContent = prefix + target + suffix; return; }
    var dur = 1400, start = null;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.textContent = prefix + val + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function initCounters() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;
    if (!("IntersectionObserver" in window)) { nums.forEach(animateCount); return; }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* ============================================================
     3) ACORDEÃO (FAQ) — acessível
     ============================================================ */
  function initAccordion() {
    var triggers = document.querySelectorAll(".acc-trigger");
    triggers.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var expanded = btn.getAttribute("aria-expanded") === "true";
        var panel = document.getElementById(btn.getAttribute("aria-controls"));
        btn.setAttribute("aria-expanded", String(!expanded));
        if (panel) panel.classList.toggle("is-open", !expanded);
      });
    });
  }

  /* ============================================================
     4) CARROSSEL (depoimentos) — arrastável, dots, setas, autopausa
     ============================================================ */
  function initCarousel() {
    var carousels = document.querySelectorAll("[data-carousel]");
    carousels.forEach(function (root) {
      var track = root.querySelector(".carousel-track");
      var slides = Array.prototype.slice.call(track.children);
      var prev = root.querySelector("[data-prev]");
      var next = root.querySelector("[data-next]");
      var dotsWrap = root.querySelector(".carousel-dots");
      if (!slides.length) return;

      // dots
      var dots = [];
      if (dotsWrap) {
        slides.forEach(function (_, i) {
          var d = document.createElement("button");
          d.type = "button";
          d.setAttribute("aria-label", "Ir para o depoimento " + (i + 1));
          d.addEventListener("click", function () { scrollToSlide(i); });
          dotsWrap.appendChild(d);
          dots.push(d);
        });
      }

      function currentIndex() {
        var center = track.scrollLeft + track.clientWidth / 2;
        var best = 0, bestDist = Infinity;
        slides.forEach(function (s, i) {
          var c = s.offsetLeft + s.offsetWidth / 2;
          var dist = Math.abs(c - center);
          if (dist < bestDist) { bestDist = dist; best = i; }
        });
        return best;
      }
      function updateDots() {
        var idx = currentIndex();
        dots.forEach(function (d, i) { d.setAttribute("aria-current", String(i === idx)); });
      }
      function scrollToSlide(i) {
        var s = slides[Math.max(0, Math.min(i, slides.length - 1))];
        track.scrollTo({ left: s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2, behavior: prefersReduced ? "auto" : "smooth" });
      }
      if (prev) prev.addEventListener("click", function () { scrollToSlide(currentIndex() - 1); });
      if (next) next.addEventListener("click", function () { scrollToSlide(currentIndex() + 1); });
      track.addEventListener("scroll", function () {
        window.clearTimeout(track._t);
        track._t = window.setTimeout(updateDots, 80);
      }, { passive: true });
      updateDots();

      // arrastar com mouse (touch já é nativo)
      var down = false, startX = 0, startScroll = 0;
      track.addEventListener("mousedown", function (e) { down = true; startX = e.pageX; startScroll = track.scrollLeft; track.style.cursor = "grabbing"; });
      window.addEventListener("mouseup", function () { down = false; track.style.cursor = ""; });
      track.addEventListener("mouseleave", function () { down = false; track.style.cursor = ""; });
      track.addEventListener("mousemove", function (e) { if (!down) return; e.preventDefault(); track.scrollLeft = startScroll - (e.pageX - startX); });
    });
  }

  /* ============================================================
     5) FORMULÁRIO DE PRÉ-INSCRIÇÃO
     ============================================================ */
  function initForm() {
    var form = document.getElementById("preinscricao");
    if (!form) return;

    var success = document.getElementById("form-success");
    var submitBtn = form.querySelector('[type="submit"]');

    /* Pré-seleção via query string (?plano=vip | ?plano=grupo) */
    var params = new URLSearchParams(location.search);
    var plano = (params.get("plano") || "").toLowerCase();
    var vipCheck = form.querySelector('input[value="vip"]');
    var grupoCheck = form.querySelector('input[value="grupo"]');
    if (plano === "vip" && vipCheck) vipCheck.checked = true;
    if (plano === "grupo" && grupoCheck) grupoCheck.checked = true;

    /* Campo condicional VIP */
    var vipExtra = document.getElementById("vip-extra");
    function syncVip() {
      var on = vipCheck && vipCheck.checked;
      if (vipExtra) vipExtra.classList.toggle("is-shown", !!on);
    }
    if (vipCheck) vipCheck.addEventListener("change", syncVip);
    syncVip();

    /* Máscara simples de telefone BR */
    var tel = form.querySelector('input[name="celular"]');
    if (tel) {
      tel.addEventListener("input", function () {
        var v = tel.value.replace(/\D/g, "").slice(0, 11);
        var out = v;
        if (v.length > 6) out = "(" + v.slice(0, 2) + ") " + v.slice(2, 7) + "-" + v.slice(7);
        else if (v.length > 2) out = "(" + v.slice(0, 2) + ") " + v.slice(2);
        else if (v.length > 0) out = "(" + v;
        tel.value = out;
      });
    }

    /* helpers de erro */
    function setError(field, msgId, show) {
      var input = form.querySelector(field);
      var msg = document.getElementById(msgId);
      if (input) input.setAttribute("aria-invalid", show ? "true" : "false");
      if (msg) msg.classList.toggle("is-visible", show);
      return !show;
    }

    function validate() {
      var ok = true;
      var firstInvalid = null;

      // Nome
      var nome = form.querySelector('[name="nome"]');
      var nomeOk = nome.value.trim().length >= 2;
      setError('[name="nome"]', "err-nome", !nomeOk);
      if (!nomeOk && !firstInvalid) firstInvalid = nome;
      ok = ok && nomeOk;

      // Celular (10 ou 11 dígitos)
      var celDigits = tel.value.replace(/\D/g, "");
      var celOk = celDigits.length === 10 || celDigits.length === 11;
      setError('[name="celular"]', "err-celular", !celOk);
      if (!celOk && !firstInvalid) firstInvalid = tel;
      ok = ok && celOk;

      // Checkboxes rotina (>=1)
      var rotinaChecked = form.querySelectorAll('input[name="rotina"]:checked').length > 0;
      var rotMsg = document.getElementById("err-rotina");
      if (rotMsg) rotMsg.classList.toggle("is-visible", !rotinaChecked);
      if (!rotinaChecked && !firstInvalid) firstInvalid = form.querySelector('input[name="rotina"]');
      ok = ok && rotinaChecked;

      // Ciência (radio)
      var cienciaOk = !!form.querySelector('input[name="ciencia"]:checked');
      var ciMsg = document.getElementById("err-ciencia");
      if (ciMsg) ciMsg.classList.toggle("is-visible", !cienciaOk);
      if (!cienciaOk && !firstInvalid) firstInvalid = form.querySelector('input[name="ciencia"]');
      ok = ok && cienciaOk;

      // Motivo
      var motivo = form.querySelector('[name="motivo"]');
      var motivoOk = motivo.value.trim().length >= 3;
      setError('[name="motivo"]', "err-motivo", !motivoOk);
      if (!motivoOk && !firstInvalid) firstInvalid = motivo;
      ok = ok && motivoOk;

      // Como encontrou
      var origem = form.querySelector('[name="origem"]');
      var origemOk = origem.value.trim().length >= 2;
      setError('[name="origem"]', "err-origem", !origemOk);
      if (!origemOk && !firstInvalid) firstInvalid = origem;
      ok = ok && origemOk;

      if (firstInvalid) firstInvalid.focus();
      return ok;
    }

    // limpar erro ao digitar
    form.addEventListener("input", function (e) {
      var t = e.target;
      if (t.getAttribute && t.getAttribute("aria-invalid") === "true") {
        t.setAttribute("aria-invalid", "false");
        var msg = t.closest(".field") && t.closest(".field").querySelector(".error-msg");
        if (msg) msg.classList.remove("is-visible");
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) return;

      // honeypot
      var hp = form.querySelector('[name="_gotcha"]');
      if (hp && hp.value) return; // bot

      submitBtn.disabled = true;
      var originalText = submitBtn.textContent;
      submitBtn.textContent = "Enviando…";

      function showSuccess() {
        form.style.display = "none";
        if (success) {
          success.classList.add("is-shown");
          success.setAttribute("tabindex", "-1");
          success.focus();
          success.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" });
        }
      }
      function showFail() {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        alert("Não foi possível enviar agora. Tente novamente ou fale comigo no WhatsApp.");
      }

      // Modo demonstração (sem endpoint configurado)
      if (!FORM_ENDPOINT) {
        window.setTimeout(showSuccess, 600);
        return;
      }

      fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) { if (res.ok) showSuccess(); else showFail(); })
        .catch(showFail);
    });
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    initReveal();
    initCounters();
    initAccordion();
    initCarousel();
    initForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
