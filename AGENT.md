# AGENT.md — 鸽子笼 · 作品集

> 我是 WorkBuddy，erma0 的 AI 搭档。这个文件定义我在本项目中的身份、能力和工作方式。

---

## 项目概况

| 项 | 值 |
|---|---|
| 名称 | 鸽子笼 (Dove Cage) — 作品集 |
| 子域名 | **works.erma0.cn**（独立于主站） |
| 主站 | erma0.cn — 个人导航页，含"作品集"按钮跳转至此 |
| 类型 | 静态作品展示 + 在线工具集 |
| 部署 | Vercel，纯静态，零构建 |
| 技术栈 | HTML + CSS + Vanilla JS，无框架，零依赖 |
| 字体 | Noto Serif SC（标题衬线）、Inter（正文无衬线）、JetBrains Mono（等宽/标签） |
| 主题 | 米白纸质感 + 暗色工具区，双主题共存 |

### 站点关系

```
erma0.cn（主站 · 极简导航页）
  ├── 音乐板 → ./music/
  ├── 作品集 → works.erma0.cn  ← 本项目
  ├── 博客   → blog.erma0.cn
  └── 52论坛  → 外链
```

---

## 目录结构

```
portfolio/
├── index.html              # 作品集主页 — JS 数据驱动卡片渲染
├── styles.css              # 全局样式（米白纸主题、卡片、动效）
├── main.js                 # 动效 + 卡片渲染 + 图标映射
├── vercel.json             # Vercel rewrite 配置
├── AGENT.md                # 本文件
├── .workbuddy/memory/      # 项目记忆（按日记录 + MEMORY.md）
└── online_tools/           # 在线工具子模块（暗色主题，非原创复刻）
    ├── index.html          # 工具集首页 — 分类导航
    ├── css/
    │   ├── style.css       # 工具页全局样式（暗色）
    │   ├── main.css        # 公共布局
    │   ├── tool.css        # 单工具页通用样式
    │   └── mobile.css      # 移动端适配
    ├── js/                 # 工具用库（jQuery、MD5、Rusha 等）
    ├── img/                # 图标
    └── *.htm               # 各工具页（~37 个）
```

---

## 设计语言

### 作品集主页 — 米白纸主题

| 变量 | 值 | 用途 |
|---|---|---|
| `--bg` | `#f6f3ec` | 米白纸底色 |
| `--bg-soft` | `#efeadd` | 次级纸面（卡片背景） |
| `--ink` | `#1a1a1a` | 主文字色 |
| `--ink-soft` | `#4a4a4a` | 次级文字 |
| `--ink-mute` | `#8a8a82` | 弱化文字 |
| `--line` | `#d8d2c2` | 分隔线/边框 |
| `--accent` | `#b8451f` | 朱砂红（节制使用） |
| `--accent-2` | `#2c4a3e` | 松绿（备选） |
| `--radius` | `14px` | 卡片圆角 |
| `--ease` | `cubic-bezier(.2, .7, .2, 1)` | 通用缓动 |
| `--ease-out` | `cubic-bezier(.16, 1, .3, 1)` | 出场缓动 |

### 在线工具区 — 暗色主题

| 变量 | 值 | 用途 |
|---|---|---|
| `--bg-dark` | `#1a1a1a` | 深色底 |
| `--bg-card` | `rgba(255,255,255,.04)` | 工具分类卡 |
| `--text-primary` | `#ffffff` | 主文字 |

### 动效系统

| 动效 | 实现 | 触发 |
|---|---|---|
| 噪点纹理 | SVG feTurbulence + multiply 混合 | 全局常驻 |
| 鼠标光晕 | radial-gradient + requestAnimationFrame lerp | 全局跟随 |
| 字符拆分入场 | `[data-split]` → JS 逐字 `<span class="char">` + stagger delay | Hero 标题 |
| IntersectionObserver | `[data-reveal]` / `[data-split]` / `.card` 滚动触发 `.is-in` | 所有卡片/区块 |
| 3D 倾斜 + 光斑 | `[data-tilt]` → mousemove 计算 rotateX/Y + CSS `--mx`/`--my` | 卡片悬停 |
| 导航滚动实底 | scroll > 8px → `.is-scrolled` + backdrop-filter blur | 顶部导航 |
| 下划线滑入 | `::after` scaleX(0→1) + transform-origin 切换 | 导航链接 |
| 减少动效 | `prefers-reduced-motion` 媒体查询全局关闭 | 无障碍 |

---

## 卡片系统（数据驱动）

卡片通过 JS 数组驱动渲染，**增删改项目只需编辑 `index.html` 中的 `window.__WORKS` 数组**，无需碰 DOM。

### 数据字段

```js
{
  id: 'invoice',           // 唯一标识（用于图标匹配）
  title: '发票打印系统',     // 卡片标题
  desc: '...',              // 描述文字
  stack: 'Tauri 2 · Rust',  // 技术栈（显示在 footer）
  link: '#',                // 链接地址（# 表示暂无）
  external: false,          // 是否新窗口打开
  icon: 'invoice',          // 图标 ID（见 ICONS 映射）
  pinned: true,             // 置顶（pinned 的项目始终排在最前）
  featured: true,           // 精选卡（跨双列 + 渐变背景，每页仅一个）
  tags: [                   // 标签数组
    { text: '主推', color: 'accent' },
    { text: '桌面应用', color: 'mute' }
  ],
  note: '非原创作品...'     // 可选，备注行（斜体弱化文字）
}
```

### 标签系统

| color 值 | 效果 | 适用 |
|---|---|---|
| `'accent'` | 朱砂红底，醒目 | 主推、精选 |
| `'mute'` | 灰底，低调 | 工具、预告、复刻、链接等常规标记 |

### 排序规则

1. `pinned: true` → 置顶组（按数组顺序）
2. `pinned: false` → 普通组（按数组顺序）
3. `featured: true` → 加 `card--feature` 样式类（跨双列、渐变背景）
4. 精选卡只有一个，如果有多个 `featured: true`，只有第一个生效

### 图标系统

图标 ID 与 SVG 代码的映射定义在 `main.js` 的 `ICONS` 对象中。所有图标统一 24×24 viewBox，描边风格（`fill="none" stroke="currentColor" stroke-width="1.5"`）。

添加新图标：
```js
// 在 main.js 的 ICONS 对象中添加一条
newIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">...</svg>',
```

---

## 我的身份

| 项 | 值 |
|---|---|
| 名字 | WorkBuddy |
| 类型 | AI 编程搭档 |
| 风格 | 直接、务实、中文优先 |
| 签名 | 🕊 |

---

## 工作原则

### 代码风格
- 保持纯 HTML/CSS/JS，不引入框架或构建工具
- 复用项目现有 CSS 变量和动效模式
- 不添加不必要的注释，代码即文档
- 优先 CDN 引入成熟第三方库，避免重复造轮子

### Git 工作流
- **最小提交原则**：每完成一个独立功能或修复就本地 commit
- 提交信息用中文，清晰说明改动
- 做完就推

### 文件管理
- 目录结构保持清晰，不产生冗余文件
- 不随意写独立测试文件；必要的测试用完即删
- 产出内容确保人类和其他 AI 都能看懂

---

## 常见任务指南

### 新增/修改项目卡片
编辑 `index.html` 中 `window.__WORKS` 数组：
- **新增**：在合适位置插入一个新对象
- **修改**：直接改对应字段
- **删除**：移除整个对象
- **置顶**：改 `pinned: true`，调整在该组中的位置决定排序
- **主推**：改 `featured: true`（记得把前一个的 `featured` 关掉）

### 新增在线工具页
1. 在 `online_tools/` 下创建 `tool_name.htm`
2. 复用 `online_tools/css/tool.css` 和现有 JS 库
3. 保持暗色主题风格
4. 在 `online_tools/index.html` 对应分类下添加链接

### 修改样式
- 主页样式 → `styles.css`（CSS 变量在 `:root` 统一管理）
- 工具页样式 → `online_tools/css/style.css`
- 单工具页公用 → `online_tools/css/tool.css`
- 动效 + 卡片渲染 → `main.js`

### 添加新图标
在 `main.js` 的 `ICONS` 对象中添加一项，key 与卡片数据的 `icon` 字段对应。

### 部署
- 推送 Git → Vercel 自动部署
- `vercel.json` 配置 rewrite 支持 SPA
- 子域名 works.erma0.cn 在 Vercel 项目设置中绑定

---

## erma0 作品清单

| 项目 | 技术栈 | 类型 | 链接 |
|---|---|---|---|
| 发票打印系统 | Tauri 2 · Rust · pdf-lib · print.js | 跨平台桌面应用 | 主推项目 |
| std_scanner | Python · FastAPI · pywebview | 标准文档抓取 | GitHub |
| 博客 | — | 技术/生活记录 | blog.erma0.cn |
| 在线工具集（复刻） | HTML · Vanilla JS | 编码/哈希/转换工具 | works.erma0.cn/online_tools/ |
| 网格员公示牌 | Ardot MCP · jsPDF · Noto Sans SC | 安全生产可视化 | 内部项目 |
