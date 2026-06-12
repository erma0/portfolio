/* ============================================
   鸽子笼 · 作品集  动效 & 卡片渲染脚本
   纯原生，零依赖
   ============================================ */
(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. 顶部导航：滚动后变实底 ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. 鼠标光晕跟随 ---------- */
  const glow = document.getElementById('cursorGlow');
  if (glow && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    let gx = window.innerWidth / 2, gy = window.innerHeight / 2;
    let tx = gx, ty = gy;
    document.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
    const tick = () => {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- 3. 图标 SVG 映射 ---------- */
  const ICONS = {
    invoice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
    scanner: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>',
    tools:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    blog:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16v16H4z"/><path d="M4 8h16M8 4v16"/></svg>',
    more:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"/></svg>'
  };

  /* ---------- 4. 卡片渲染 ---------- */
  const grid = document.getElementById('worksGrid');
  const works = window.__WORKS || [];

  works.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  // type → {按钮文字, 链接, 是否外链}
  const TYPE_META = {
    desktop:  { action: '查看 →', external: false },
    mobile:   { action: '查看 →', external: false },
    web:      { action: '打开 →', external: false },
    embed:    { action: '打开 →', external: false },
    external: { action: '访问 →', external: false }
  };

  works.forEach((w) => {
    const meta = TYPE_META[w.type] || { action: '查看 →', external: false };
    // 链接解析：detail 优先，否则用 link
    const href = (w.detail && w.detail !== '#') ? w.detail : (w.link || '#');
    const isExternal = w.type === 'external' || (!w.detail && w.link && w.link.startsWith('http'));

    const card = document.createElement('a');
    card.className = 'card' + (w.featured ? ' card--feature' : '');
    card.href = href;
    card.setAttribute('data-tilt', '');
    if (isExternal) {
      card.target = '_blank';
      card.rel = 'noopener';
    }
    if (w.status === 'wip') card.classList.add('card--wip');
    if (w.status === 'archived') card.classList.add('card--archived');

    // 标签
    let tagsHTML = '';
    if (w.tags && w.tags.length) {
      tagsHTML = w.tags.map((t) => {
        const cls = t.color === 'accent' ? 'card__tag--accent' : 'card__tag';
        return `<span class="${cls}">${t.text}</span>`;
      }).join('');
    }

    // 图标
    const iconHTML = `<div class="card__icon" aria-hidden="true">${ICONS[w.icon] || ''}</div>`;

    // 备注行
    const noteHTML = w.note ? `<div class="card__note">${w.note}</div>` : '';

    card.innerHTML = `
      <div class="card__tags">${tagsHTML}</div>
      ${iconHTML}
      <h3 class="card__title">${w.title}</h3>
      <p class="card__desc">${w.desc}</p>
      ${noteHTML}
      <div class="card__foot">
        <span class="card__stack">${w.stack}</span>
        <span class="card__link">${meta.action}</span>
      </div>
      <span class="card__sheen" aria-hidden="true"></span>
    `;

    grid.appendChild(card);
  });

  /* ---------- 5. 标题字符拆分 ---------- */
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

  /* ---------- 6. IntersectionObserver：触发进入动画 ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal], [data-split], .card').forEach((el) => io.observe(el));

  /* ---------- 7. 卡片 3D 倾斜 + 光斑位置 ---------- */
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      const MAX = 4;
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

  /* ---------- 8. 平滑滚动到锚点 ---------- */
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
