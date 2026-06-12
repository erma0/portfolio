/* ============================================
   鸽子笼 · 作品集  动效脚本
   纯原生，零依赖
   ============================================ */
(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. 顶部导航：滚动后变实底 ---------- */
  const header = document.getElementById('siteHeader');
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    if (y > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. 鼠标光晕跟随 ---------- */
  const glow = document.getElementById('cursorGlow');
  if (glow && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    let gx = window.innerWidth / 2, gy = window.innerHeight / 2;
    let tx = gx, ty = gy;
    document.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
    });
    const tick = () => {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- 3. 标题字符拆分（为每个字符包一层 span） ---------- */
  const splitTargets = document.querySelectorAll('[data-split]');
  splitTargets.forEach((el) => {
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.style.transitionDelay = `${i * 28}ms`;
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      el.appendChild(span);
    });
  });

  /* ---------- 4. IntersectionObserver：触发进入动画 ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal], [data-split], .card').forEach((el) => io.observe(el));

  /* ---------- 5. 卡片 3D 倾斜 + 光斑位置（仅支持 hover 的设备） ---------- */
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      const MAX = 4; // 最大倾斜角度
      let raf = null;
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (0.5 - py) * MAX;
        const ry = (px - 0.5) * MAX;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          card.style.transform = `translateY(-6px) perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
          card.style.setProperty('--mx', `${px * 100}%`);
          card.style.setProperty('--my', `${py * 100}%`);
        });
      };
      const onLeave = () => {
        cancelAnimationFrame(raf);
        card.style.transform = '';
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }

  /* ---------- 6. 平滑滚动到锚点 ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
