/* renderer.js — 卡片渲染（数据驱动 DOM 生成）
   依赖：window.__WORKS（works.js）、window.__ICONS（icons.js） */

(function () {
  'use strict';

  var grid = document.getElementById('worksGrid');
  if (!grid) return;

  var works = window.__WORKS;
  var ICONS = window.__ICONS;
  if (!works || !Array.isArray(works)) return;

  /* ---- 工具函数 ---- */

  function escapeHtml(s) {
    var el = document.createElement('div');
    el.textContent = s;
    return el.innerHTML;
  }

  function getIcon(id) {
    return ICONS[id] || ICONS['default'] || '';
  }

  /* ---- 排序：pinned 置顶 ---- */

  var pinned = works.filter(function (w) { return w.pinned; });
  var rest   = works.filter(function (w) { return !w.pinned; });
  var sorted = pinned.concat(rest);

  /* ---- 渲染 ---- */

  var frag = document.createDocumentFragment();

  sorted.forEach(function (item, idx) {
    var card = document.createElement('a');
    card.className = 'card';
    card.setAttribute('data-reveal', '');
    card.setAttribute('data-tilt', '');

    if (item.featured) card.classList.add('card--feature');
    if (item.status === 'wip')       card.classList.add('card--wip');
    if (item.status === 'archived')   card.classList.add('card--archived');

    var link = '#';
    if (item.action === 'detail' && item.detail && item.detail !== '#') {
      link = item.detail;
    } else if (item.link && item.link !== '#') {
      link = item.link;
    }
    card.href = link;
    if (item.action === 'link') card.target = '_blank';
    if (link === '#') card.setAttribute('aria-disabled', 'true');

    /* 标签 */
    var tagsHtml = '';
    if (item.tags && item.tags.length) {
      tagsHtml = '<div class="card__tags">';
      item.tags.forEach(function (t) {
        var cls = t.color === 'accent' ? 'card__tag--accent' : 'card__tag';
        tagsHtml += '<span class="' + cls + '">' + escapeHtml(t.text) + '</span>';
      });
      tagsHtml += '</div>';
    }

    /* 备注 */
    var noteHtml = item.note
      ? '<p class="card__note">' + escapeHtml(item.note) + '</p>'
      : '';

    /* 动作按钮文字 */
    var actionLabel = '查看 →';
    if (item.action === 'open')  actionLabel = '打开 →';
    if (item.action === 'link')  actionLabel = '访问 →';

    /* 卡片内容 */
    card.innerHTML =
      '<div class="card__sheen" aria-hidden="true"></div>' +
      tagsHtml +
      '<div class="card__icon">' + getIcon(item.icon) + '</div>' +
      noteHtml +
      '<h3 class="card__title">' + escapeHtml(item.title) + '</h3>' +
      '<p class="card__desc">' + escapeHtml(item.desc) + '</p>' +
      '<div class="card__foot">' +
        '<span>' + escapeHtml(item.stack || '') + '</span>' +
        '<span class="card__link">' + actionLabel + '</span>' +
      '</div>';

    frag.appendChild(card);
  });

  grid.appendChild(frag);
})();
