/* animations.js — 动效系统
   包含：导航滚动变色、鼠标光晕、IO 入场、字符拆分、3D 倾斜 */

/* ---- 1. 导航滚动实底 ---- */

(function navScroll() {
  'use strict';

  var header = document.getElementById('siteHeader');
  if (!header) return;
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ---- 2. 鼠标光晕跟随 ---- */

(function cursorGlow() {
  'use strict';

  var glow = document.getElementById('cursorGlow');
  if (!glow || 'ontouchstart' in window) return;

  var mx = 0, my = 0, cx = 0, cy = 0;
  var rafId = 0;
  var moving = false;

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
    cancelAnimationFrame(rafId);
  });

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
})();

/* ---- 3. IntersectionObserver：入场动效 ---- */

(function revealOnScroll() {
  'use strict';

  var targets = document.querySelectorAll('[data-reveal], [data-split], .card');
  if (!targets.length || !('IntersectionObserver' in window)) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(function (el) { io.observe(el); });
})();

/* ---- 4. 标题字符拆分（data-split） ---- */

(function splitText() {
  'use strict';

  document.querySelectorAll('[data-split]').forEach(function (el) {
    var text = el.textContent;
    el.textContent = '';
    text.split('').forEach(function (ch) {
      var span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch === ' ' ? '\u00a0' : ch;
      el.appendChild(span);
    });
  });
})();

/* ---- 5. 卡片 3D 倾斜 + 光斑 ---- */

(function tiltCards() {
  'use strict';

  if ('ontouchstart' in window) return;
  var cards = document.querySelectorAll('[data-tilt]');
  if (!cards.length) return;

  cards.forEach(function (card) {
    var sheen = card.querySelector('.card__sheen');
    var bounds;

    card.addEventListener('mouseenter', function () {
      bounds = card.getBoundingClientRect();
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
      card.style.transform = '';
      bounds = null;
    });
  });
})();
