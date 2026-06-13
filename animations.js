/* animations.js — 动效系统
   包含：导航滚动变色、鼠标光晕、IO 入场、字符拆分、3D 倾斜 */

/* ---- 1. 导航滚动实底 ---- */

(function navScroll() {
  'use strict';

  var header = document.getElementById('siteHeader');
  if (!header) return;
  var ticking = false;
  var scrolled = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () {
        var isScrolled = window.scrollY > 8;
        if (isScrolled !== scrolled) {
          scrolled = isScrolled;
          header.classList.toggle('is-scrolled', isScrolled);
        }
        ticking = false;
      });
    }
  }, { passive: true });
})();

/* ---- 2. 鼠标光晕跟随 ---- */

(function cursorGlow() {
  'use strict';

  var glow = document.getElementById('cursorGlow');
  if (!glow || 'ontouchstart' in window || matchMedia('(pointer: coarse)').matches) return;

  var mx = 0, my = 0, cx = 0, cy = 0;
  var rafId = 0;
  var moving = false;

  function animate() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    glow.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)';
    if (Math.abs(mx - cx) > 0.5 || Math.abs(my - cy) > 0.5) {
      rafId = requestAnimationFrame(animate);
    } else {
      moving = false;
    }
  }

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    if (!moving) {
      moving = true;
      glow.style.opacity = '1';
      rafId = requestAnimationFrame(animate);
    }
  }, { passive: true });

  document.addEventListener('mouseleave', function () {
    moving = false;
    glow.style.opacity = '0';
    if (rafId) cancelAnimationFrame(rafId);
  });
})();

/* ---- 3. IntersectionObserver：入场动效 ---- */

(function revealOnScroll() {
  'use strict';

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal], [data-split], .card').forEach(function (el) {
      el.classList.add('is-in');
    });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('is-in');
        io.unobserve(entries[i].target);
      }
    }
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-reveal], [data-split], .card').forEach(function (el) {
    io.observe(el);
  });
})();

/* ---- 4. 标题字符拆分（data-split） ---- */

(function splitText() {
  'use strict';

  document.querySelectorAll('[data-split]').forEach(function (el) {
    var text = el.textContent;
    el.textContent = '';
    for (var i = 0; i < text.length; i++) {
      var span = document.createElement('span');
      span.className = 'char';
      span.style.transitionDelay = (i * 40) + 'ms';
      span.textContent = text[i] === ' ' ? '\u00a0' : text[i];
      el.appendChild(span);
    }
  });
})();

/* ---- 5. 卡片 3D 倾斜 + 光斑 ---- */

(function tiltCards() {
  'use strict';

  if ('ontouchstart' in window || matchMedia('(pointer: coarse)').matches) return;
  var cards = document.querySelectorAll('[data-tilt]');
  if (!cards.length) return;

  cards.forEach(function (card) {
    var sheen = card.querySelector('.card__sheen');
    var bounds = null;

    card.addEventListener('mouseenter', function () {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'box-shadow .5s var(--ease-out), border-color .4s var(--ease)';
    });

    card.addEventListener('mousemove', function (e) {
      if (!bounds) return;
      var x = e.clientX - bounds.left;
      var y = e.clientY - bounds.top;
      var px = (x / bounds.width  - 0.5) * 2;
      var py = (y / bounds.height - 0.5) * 2;

      card.style.transform =
        'perspective(800px) rotateY(' + (px * 3) + 'deg) rotateX(' + (-py * 3) + 'deg) translateY(-6px)';

      if (sheen) {
        sheen.style.setProperty('--mx', x + 'px');
        sheen.style.setProperty('--my', y + 'px');
      }
    });

    card.addEventListener('mouseleave', function () {
      card.style.transition = '';
      card.style.transform = '';
      bounds = null;
    });
  });
})();
