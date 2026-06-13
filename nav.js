/**
 * 导航栏统一注入脚本
 * 根据页面 data-nav 属性生成对应的导航栏 HTML
 * 用法：<header class="site-header" id="siteHeader" data-nav="home"></header>
 *       <script src="nav.js"></script>
 */
(function () {
  var header = document.getElementById('siteHeader');
  if (!header) return;

  var type = header.getAttribute('data-nav') || 'home';

  var configs = {
    home: {
      brandHref: 'https://erma0.cn',
      brandLabel: '返回主页',
      brandSub: '/ works',
      links: [
        { href: '#works', text: '作品' },
        { href: 'https://blog.erma0.cn', text: '博客 ↗', ext: true }
      ],
      ghost: { href: 'https://erma0.cn', text: '← 主页' }
    },
    'tools-index': {
      brandHref: '../',
      brandLabel: '返回作品集',
      brandSub: '/ tools',
      links: [
        { href: '../', text: '作品集' },
        { href: 'https://blog.erma0.cn', text: '博客 ↗', ext: true }
      ],
      ghost: { href: 'https://erma0.cn', text: '← 主页' }
    },
    works: {
      brandHref: 'https://erma0.cn',
      brandLabel: '返回主页',
      brandSub: '/ works',
      links: [
        { href: 'https://blog.erma0.cn', text: '博客 ↗', ext: true },
        { href: 'https://github.com/erma0', text: 'GitHub ↗', ext: true }
      ],
      ghost: { href: '../', text: '← 作品集' }
    },
    tool: {
      brandHref: '../',
      brandLabel: '返回作品集',
      brandSub: '/ tools',
      links: [
        { href: './index.html', text: '工具列表' },
        { href: 'https://blog.erma0.cn', text: '博客 ↗', ext: true }
      ],
      ghost: { href: '../', text: '← 作品集' }
    }
  };

  var cfg = configs[type];
  if (!cfg) return;

  var html = '<a class="brand" href="' + cfg.brandHref + '" aria-label="' + cfg.brandLabel + '">'
    + '<span class="brand__mark" aria-hidden="true">🕊</span>'
    + '<span class="brand__name">鸽子笼</span>'
    + '<span class="brand__sub">' + cfg.brandSub + '</span>'
    + '</a>'
    + '<nav class="site-nav" aria-label="主导航">';

  cfg.links.forEach(function (link) {
    html += '<a href="' + link.href + '"'
      + (link.ext ? ' target="_blank" rel="noopener noreferrer"' : '')
      + '>' + link.text + '</a>';
  });

  if (cfg.ghost) {
    html += '<a class="site-nav__ghost" href="' + cfg.ghost.href + '">' + cfg.ghost.text + '</a>';
  }

  html += '</nav>';

  header.innerHTML = html;
})();
