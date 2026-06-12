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
    title: '发票打印系统',
    desc: '为内部财务流程做的小桌面应用，从开票到模板打印一条龙，Tauri + Rust 写就。',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="2" width="18" height="20" rx="2"/><path d="M7 6h10M7 10h10M7 14h6"/><circle cx="17" cy="17" r="3"/></svg>',
    pinned: true,
    featured: true,
    action: 'detail',
    detail: 'works/invoice.html',
    link: '#',
    stack: 'Tauri 2 · Rust · pdf-lib · print.js',
    repo: 'erma0/invoice-sauce',
    status: 'active',
    tags: [
      { text: '主推', color: 'accent' },
      { text: '桌面', color: 'mute' }
    ]
  },
  {
    id: 'douyin',
    title: '抖音采集工具',
    desc: '多模式抖音数据采集，GUI / Web / CLI 三种走法，开源社区反响最好的项目。',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><polygon points="10,8 16,12 10,16"/></svg>',
    pinned: true,
    action: 'link',
    detail: '',
    link: 'https://github.com/erma0/douyin',
    stack: 'Python · FastAPI · React · Vite · Aria2',
    repo: 'erma0/douyin',
    status: 'active',
    tags: [
      { text: '热榜', color: 'accent' },
      { text: '桌面', color: 'mute' }
    ]
  },
  {
    id: 'scanner',
    title: 'std_scanner 标准抓取工具',
    desc: '面向标准文档的结构化抓取与导出工具，工作中用来减少重复劳动的私人项目。',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M16 16l4 4"/><path d="M9 11h4M11 9v4"/></svg>',
    pinned: false,
    action: 'detail',
    detail: '#',
    link: '#',
    stack: 'Python · FastAPI · pywebview',
    repo: 'erma0/std_scanner',
    status: 'wip',
    tags: [
      { text: '工具', color: 'mute' }
    ]
  },
  {
    id: 'tools',
    title: '在线工具集',
    desc: '编码解码、Base64、哈希、正则测试等日常小工具的合集，打开即用无需登录。',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000-1.4l-2.6-2.6a1 1 0 00-1.4 0L4.6 8.6a1 1 0 000 1.4l2.6 2.6a1 1 0 001.4 0L14.7 6.3z"/><path d="M16 10l4 4"/><circle cx="18" cy="18" r="3"/></svg>',
    pinned: false,
    action: 'open',
    detail: '',
    link: './online_tools/',
    stack: 'HTML · Vanilla JS',
    status: 'active',
    tags: [
      { text: '复刻', color: 'mute' }
    ],
    note: '非原创作品，仅为方便使用保留的复刻版。'
  },
  {
    id: 'veilcrawler',
    title: 'VeilCrawler 网页采集器',
    desc: '轻量 Chrome 扩展，可视化点击生成采集规则。解决"所见即不可得"的数据获取痛点。',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2v20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/></svg>',
    pinned: false,
    action: 'link',
    detail: '',
    link: 'https://github.com/erma0/VeilCrawler',
    stack: 'TypeScript · React · Chrome MV3',
    repo: 'erma0/VeilCrawler',
    status: 'wip',
    tags: [
      { text: '扩展', color: 'mute' }
    ]
  },
  {
    id: 'grid-board',
    title: '安全生产网格员公示牌',
    desc: '企业安全生产网格化管理公示牌，服务"六化"建设中网格化任务，实际在用。',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
    pinned: false,
    action: 'link',
    detail: '',
    link: 'https://77414e3366764a73b8d4f0451ac04111.app.codebuddy.work/',
    stack: 'HTML · CSS · 静态页面',
    status: 'active',
    tags: [
      { text: '设计', color: 'mute' },
      { text: '安全生产', color: 'accent' }
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
