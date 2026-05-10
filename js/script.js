/* ================================================
   MORNEAULT ENTRETIEN — Custom JS para exportador
   Pegar en "JS Content" de la herramienta

   IMPORTANTE: Antes de usar, reemplazar:
   TU_ACCESS_KEY_WEB3FORMS → key de web3forms.com
   ================================================ */

(function() {

  /* ── 1. FADE-IN AL SCROLL ── */
  function initFadeIn() {
    var selectors = [
      '.framer-jwmioa', '.framer-bmn8lh', '.framer-1mww5cj',
      '.framer-v4k8d4', '.framer-101lwbb', '.framer-7znac9',
      '.framer-tq4s9y', '.framer-1sa0w5i'
    ];
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('morneault-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    selectors.forEach(function(sel) {
      var el = document.querySelector(sel);
      if (el) observer.observe(el);
    });
    document.querySelectorAll('[data-framer-name="Container"]').forEach(function(el) {
      observer.observe(el);
    });
  }

  /* ── 2. MENÚ MOBILE CUSTOM ── */
  function initMobileMenu() {
    // Detectar logo automáticamente desde el nav de Framer
    var logoSrc = 'images/8kxw08eemhstsyashbpyixrgdjg.png';
    var navLogo = document.querySelector('.framer-9Arn2 img');
    if (navLogo) logoSrc = navLogo.getAttribute('src').split('?')[0];

    // Inyectar HTML del menú
    var html = [
      '<div id="cmn">',
      '  <a class="cmn-logo" href="./"><img src="' + logoSrc + '" alt="Morneault"></a>',
      '  <button id="cmn-btn" aria-label="Menu" aria-expanded="false">',
      '    <span></span><span></span><span></span>',
      '  </button>',
      '</div>',
      '<div id="cmn-overlay"></div>',
      '<div id="cmn-dropdown">',
      '  <a href="./">Home</a>',
      '  <a href="./about.html">À Propos</a>',
      '  <a href="./services.html">Services</a>',
      '  <a href="./contact.html" class="cmn-cta">Soumission Gratuite</a>',
      '</div>'
    ].join('');

    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    wrapper.style.cssText = 'display:contents';
    document.body.insertBefore(wrapper, document.body.firstChild);

    // Lógica del toggle
    var btn = document.getElementById('cmn-btn');
    var dd  = document.getElementById('cmn-dropdown');
    var ov  = document.getElementById('cmn-overlay');

    function openMenu()  {
      btn.classList.add('open'); dd.classList.add('open'); ov.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      btn.classList.remove('open'); dd.classList.remove('open'); ov.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', function() {
      dd.classList.contains('open') ? closeMenu() : openMenu();
    });
    ov.addEventListener('click', closeMenu);
    dd.querySelectorAll('a').forEach(function(a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* ── 3. FORMULARIO WEB3FORMS ── */
  function initWeb3Forms() {
    // Solo actuar si hay formularios en la página
    var forms = document.querySelectorAll('form');
    if (!forms.length) return;

    forms.forEach(function(form) {
      if (form.dataset.w3fInit) return;
      form.dataset.w3fInit = '1';

      // Inyectar campos hidden
      function addHidden(name, value) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.insertBefore(input, form.firstChild);
      }
      addHidden('access_key', '0506bad4-d94f-4f74-a4cb-8f6e3f6eb48e');
      addHidden('subject', 'Nouveau message — Morneault Entretien Ménager');

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var btn = form.querySelector('[type="submit"], button');
        var orig = btn ? btn.textContent : '';
        if (btn) { btn.textContent = 'Envoi en cours…'; btn.disabled = true; }

        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: new FormData(form)
        })
        .then(function(r) { return r.json(); })
        .then(function(res) {
          if (res.success) {
            alert('✅ Message envoyé! Nous vous répondrons bientôt.');
            form.reset();
          } else {
            alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
          }
        })
        .catch(function() {
          alert('❌ Erreur de connexion. Veuillez réessayer.');
        })
        .finally(function() {
          if (btn) { btn.textContent = orig; btn.disabled = false; }
        });
      });
    });
  }

  /* ── INICIALIZAR TODO ── */
  function init() {
    initFadeIn();
    initMobileMenu();
    initWeb3Forms();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();