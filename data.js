/**
 * 鸽子笼 · 作品数据
 * 增删改项目只需编辑这个数组
 *
 * 字段：
 *   id        - 唯一标识
 *   title     - 卡片标题
 *   desc      - 描述文字
 *   icon      - SVG 图标（24×24 viewBox，描边风格）
 *   pinned    - 置顶
 *   featured  - 精选卡（跨双列 + 渐变背景，仅第一个生效）
 *   tags      - [{ text, color:'accent'|'mute' }]
 *   action    - 'detail' | 'open' | 'link'
 *   detail    - 详情页路径
 *   link      - 直接链接 / 备用
 *   stack     - 技术栈
 *   repo      - GitHub 仓库（可选）
 *   status    - 'active' | 'wip' | 'archived'（可选）
 *   note      - 备注行（可选）
 */

window.__WORKS = [
  {
    id: 'invoice',
    title: '发票酱 · 发票打印工具',
    desc: '跨平台发票批量打印工具，支持 PDF/OFD/XML 数电票/图片多格式，智能排版一键打印或导出。桌面版 v2.0.8 + Web 版 v3.0.0。',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="2" width="18" height="20" rx="2"/><path d="M7 6h10M7 10h10M7 14h6"/><circle cx="17" cy="17" r="3"/></svg>',
    pinned: true,
    featured: true,
    action: 'detail',
    detail: 'works/invoice.html',
    link: 'https://fapiao.erma0.cn',
    stack: 'Tauri 2 · Rust · pdf-lib · PDF.js',
    repo: 'erma0/fapiao-print',
    status: 'active',
    tags: [
      { text: '主推', color: 'accent' },
      { text: 'Web版', color: 'accent' },
      { text: '桌面版', color: 'mute' },
      { text: 'v2.0.8', color: 'mute' }
    ]
  },
  {
    id: 'douyin',
    title: '抖音采集工具',
    desc: '抖音公开数据采集工具，支持账号主页/喜欢/收藏/音乐/话题/搜索/合集/关注/粉丝等多维度采集。已合规归档，代码已清空。',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><polygon points="10,8 16,12 10,16"/></svg>',
    pinned: true,
    action: 'detail',
    detail: 'works/douyin.html',
    link: 'https://github.com/erma0/douyin',
    stack: 'Python · FastAPI · React · Vite · Aria2',
    repo: 'erma0/douyin',
    status: 'archived',
    tags: [
      { text: '已归档', color: 'accent' },
      { text: '1.6k Stars', color: 'mute' }
    ]
  },
  {
    id: 'scanner',
    title: '标准速递 · 标准扫描工具',
    desc: '基于全国标准信息公共服务平台的安全标准批量扫描与下载工具，覆盖国标/行标/地标，内置 113 个安全关键词，支持验证码识别与预览转 PDF。',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M16 16l4 4"/><path d="M9 11h4M11 9v4"/></svg>',
    pinned: false,
    action: 'detail',
    detail: 'works/scanner.html',
    link: 'https://github.com/erma0/std-scanner',
    stack: 'Python · FastAPI · pywebview · Playwright',
    repo: 'erma0/std-scanner',
    status: 'active',
    tags: [
      { text: '安全生产', color: 'accent' },
      { text: '桌面应用', color: 'mute' },
      { text: 'v3.9.1', color: 'mute' }
    ]
  },
  {
    id: 'tools',
    title: '在线工具集',
    desc: '编码解码、Base64、哈希、正则测试等日常开发小工具合集，纯前端打开即用，无需登录。',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000-1.4l-2.6-2.6a1 1 0 00-1.4 0L4.6 8.6a1 1 0 000 1.4l2.6 2.6a1 1 0 001.4 0L14.7 6.3z"/><path d="M16 10l4 4"/><circle cx="18" cy="18" r="3"/></svg>',
    pinned: false,
    action: 'open',
    detail: '',
    link: './online_tools/',
    stack: 'HTML · Vanilla JS',
    status: 'active',
    tags: [
      { text: '工具', color: 'accent' },
      { text: '复刻', color: 'mute' }
    ],
    note: '非原创作品，仅为方便使用保留的复刻版。'
  },
  {
    id: 'veilcrawler',
    title: 'VeilCrawler · 网页采集器',
    desc: '轻量可视化 Chrome 扩展，点击元素自动生成 CSS/XPath 选择器，支持 JSON API 拦截、智能翻页、去重与 CSV 导出，天然绕过反爬。',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2v20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/></svg>',
    pinned: false,
    action: 'detail',
    detail: 'works/veilcrawler.html',
    link: 'https://github.com/erma0/VeilCrawler',
    stack: 'Chrome MV3 · TypeScript · React',
    repo: 'erma0/VeilCrawler',
    status: 'active',
    tags: [
      { text: 'Chrome 扩展', color: 'accent' },
      { text: '开源', color: 'mute' },
      { text: 'v1.0.1', color: 'mute' }
    ]
  },
  {
    id: 'grid-board',
    title: '安全生产网格员公示牌',
    desc: '企业安全生产网格化管理公示牌生成工具，支持在线编辑信息、上传照片、导出 PDF/PNG/SVG，服务"六化"建设中网格化公示任务。',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
    pinned: false,
    action: 'detail',
    detail: 'works/grid-board.html',
    link: '#',
    stack: 'HTML · CSS · Vanilla JS · jsPDF',
    status: 'active',
    tags: [
      { text: '安全生产', color: 'accent' },
      { text: '可视化', color: 'mute' },
      { text: '可编辑', color: 'mute' }
    ]
  },
  {
    id: 'blog',
    title: '博客',
    desc: '记录技术折腾、读书笔记与生活琐碎。频率不高，但愿每篇都值得一读。',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h5"/><circle cx="17" cy="17" r="1.5" fill="currentColor"/></svg>',
    pinned: false,
    action: 'link',
    detail: '',
    link: 'https://blog.erma0.cn',
    stack: 'blog.erma0.cn',
    tags: [
      { text: '外链', color: 'mute' }
    ]
  }
];
