/* icons.js — SVG 图标映射
   所有卡片图标集中管理，renderer.js 通过 window.__ICONS 访问。
   图标统一 24×24 viewBox，描边风格。 */

window.__ICONS = {
  invoice:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="3" y="2" width="18" height="20" rx="2"/>' +
      '<path d="M7 6h10M7 10h10M7 14h6"/>' +
      '<circle cx="17" cy="17" r="3"/>' +
    '</svg>',

  scanner:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="11" cy="11" r="7"/>' +
      '<path d="M16 16l4 4"/>' +
      '<path d="M9 11h4M11 9v4"/>' +
    '</svg>',

  tools:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M14.7 6.3a1 1 0 000-1.4l-2.6-2.6a1 1 0 00-1.4 0L4.6 8.6a1 1 0 000 1.4l2.6 2.6a1 1 0 001.4 0L14.7 6.3z"/>' +
      '<path d="M16 10l4 4"/>' +
      '<circle cx="18" cy="18" r="3"/>' +
    '</svg>',

  blog:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M4 4h16v16H4z"/>' +
      '<path d="M8 8h8M8 12h5"/>' +
      '<circle cx="17" cy="17" r="1.5" fill="currentColor"/>' +
    '</svg>',

  grid:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="3" y="3" width="7" height="7" rx="1"/>' +
      '<rect x="14" y="3" width="7" height="7" rx="1"/>' +
      '<rect x="3" y="14" width="7" height="7" rx="1"/>' +
      '<rect x="14" y="14" width="7" height="7" rx="1"/>' +
    '</svg>',

  toolsDark:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/>' +
      '<path d="M8 8h8v8H8z"/>' +
      '<path d="M10 10h4v4h-4z"/>' +
    '</svg>',

  music:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="8" cy="16" r="3"/><circle cx="16" cy="16" r="3"/>' +
      '<path d="M8 13V5l8 2v9"/>' +
    '</svg>',

  pigeon:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M12 2C6.5 2 2 6 2 10c0 2 1 4 3 5v2l3-2a8 8 0 004 1c1 0 2-.2 3-.5"/>' +
      '<path d="M22 10c0-2-1.5-4-4-5"/>' +
      '<path d="M15 10l-2 2-2-2"/>' +
    '</svg>',

  default:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="12" cy="12" r="9"/>' +
      '<path d="M12 8v4l3 3"/>' +
    '</svg>',
};
