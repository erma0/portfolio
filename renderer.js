/* renderer.js — 卡片渲染（数据驱动 DOM 生成）
   依赖：window.__WORKS（data.js） */

(function () {
  'use strict';

  var grid = document.getElementById('worksGrid');
  if (!grid) return;

  var works = window.__WORKS;
  if (!works || !Array.isArray(works)) {
    console.warn('[renderer] window.__WORKS 缺失或非数组，跳过渲染');
    return;
  }

  /* ---- 工具函数 ---- */

  var ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) { return ESCAPE_MAP[c]; });
  }

  function resolveLink(item) {
    if (item.action === 'detail' && item.detail && item.detail !== '#') return item.detail;
    if (item.link && item.link !== '#') return item.link;
    return '#';
  }

  function actionLabel(item) {
    if (item.action === 'open') return '打开 →';
    if (item.action === 'link') return '访问 →';
    return '查看 →';
  }

  /* ---- 排序：pinned 置顶 ---- */

  var pinned = works.filter(function (w) { return w.pinned; });
  var rest   = works.filter(function (w) { return !w.pinned; });
  var sorted = pinned.concat(rest);

  /* ---- 渲染 ---- */

  var frag = document.createDocumentFragment();

  sorted.forEach(function (item, idx) {
    try {
      var card = document.createElement('a');
      card.className = 'card';
      card.setAttribute('data-reveal', '');
      card.setAttribute('data-tilt', '');

      if (item.featured) card.classList.add('card--feature');
      if (item.status === 'wip')       card.classList.add('card--wip');
      if (item.status === 'archived')   card.classList.add('card--archived');

      var link = resolveLink(item);
      card.href = link;
      if (item.action === 'link') card.target = '_blank';
      if (link === '#') card.setAttribute('aria-disabled', 'true');

      /* 标签 */
      var tagsHtml = '';
      if (item.tags && item.tags.length) {
        var tagSpans = item.tags.map(function (t) {
          var cls = t.color === 'accent' ? 'card__tag--accent' : 'card__tag';
          return '<span class="' + cls + '">' + escapeHtml(t.text) + '</span>';
        }).join('');
        tagsHtml = '<div class="card__tags">' + tagSpans + '</div>';
      }

      /* 备注 */
      var noteHtml = item.note
        ? '<p class="card__note">' + escapeHtml(item.note) + '</p>'
        : '';

      /* 卡片内容 */
      card.innerHTML =
        '<div class="card__sheen" aria-hidden="true"></div>' +
        tagsHtml +
        '<div class="card__icon">' + (item.icon || '') + '</div>' +
        noteHtml +
        '<h3 class="card__title">' + escapeHtml(item.title) + '</h3>' +
        '<p class="card__desc">' + escapeHtml(item.desc) + '</p>' +
        '<div class="card__foot">' +
          '<span>' + escapeHtml(item.stack || '') + '</span>' +
          '<span class="card__link">' + actionLabel(item) + '</span>' +
        '</div>';

      frag.appendChild(card);
    } catch (err) {
      console.error('[renderer] 卡片渲染失败:', item.id || idx, err);
    }
  });

  grid.appendChild(frag);
})();
