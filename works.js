/**
 * 鸽子笼 · 作品配置
 * 增删改项目只需编辑这个数组，零异步开销，直接 window.__WORKS 访问
 *
 * 字段说明：
 *   id        - 唯一标识（对应 ICONS 图标映射）
 *   title     - 卡片标题
 *   desc      - 描述文字
 *   icon      - 图标 ID（见 main.js ICONS 对象）
 *   pinned    - 是否置顶（pinned 的项目排在最前）
 *   featured  - 是否精选卡（跨双列 + 渐变背景，仅一个）
 *   tags      - 标签 [{ text, color:'accent'|'mute' }]
 *   action    - 'detail'（跳详情页）| 'open'（直接打开）| 'link'（跳外链）
 *   detail    - 详情页路径（action='detail' 时用）
 *   link      - 直接链接（action='open'/'link' 时用）/ 备用链接
 *   stack     - 技术栈（显示在卡片 footer）
 *   repo      - GitHub 仓库地址（可选）
 *   status    - 'active'|'wip'|'archived'（可选）
 *   note      - 备注行（非原创声明等，可选）
 */

window.__WORKS = [
  {
    id: 'invoice',
    title: '发票打印系统',
    desc: '为内部财务流程做的小桌面应用，从开票到模板打印一条龙，Tauri + Rust 写就。',
    icon: 'invoice',
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
    id: 'scanner',
    title: 'std_scanner 标准抓取工具',
    desc: '面向标准文档的结构化抓取与导出工具，工作中用来减少重复劳动的私人项目。',
    icon: 'scanner',
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
    icon: 'tools',
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
    id: 'blog',
    title: '博客',
    desc: '记录技术折腾、读书笔记与生活琐碎。频率不高，但愿每篇都值得一读。',
    icon: 'blog',
    pinned: false,
    action: 'link',
    detail: '',
    link: 'https://blog.erma0.cn',
    stack: 'blog.erma0.cn',
    tags: [
      { text: '外链', color: 'mute' }
    ]
  },
  {
    id: 'more',
    title: '更多项目',
    desc: 'GitHub 上还有一些小玩具和未完工的实验，等收拾干净了再放到这里。',
    icon: 'more',
    pinned: false,
    action: 'link',
    detail: '',
    link: '#',
    stack: 'GitHub · 持续更新',
    repo: 'erma0',
    status: 'wip',
    tags: [
      { text: '预告', color: 'mute' }
    ]
  }
];
