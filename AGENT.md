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
| 技术栈 | HTML + CSS + Vanilla JS（icons/renderer/animations 三文件分工），无框架，零依赖 |
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
├── index.html              # 作品集主页
├── works.js                # ★ 作品数据配置（独立文件）
├── icons.js                # ★ 图标 SVG 映射（独立文件，window.__ICONS）
├── renderer.js             # ★ 卡片渲染（数据驱动 DOM 生成，IIFE）
├── animations.js           # ★ 动效系统（IO/tilt/glow/split，IIFE）
├── styles.css              # 全局样式（米白纸主题、卡片、动效）
├── AGENT.md               # 本文件
├── .workbuddy/memory/     # 项目记忆（不提交 Git）
├── works/                  # ★ 各作品详情页
│   ├── detail.css          # 详情页共享样式
│   ├── detail-template.html # 详情页标准模板（复制后替换标记）
│   ├── invoice.html        # 发票打印系统详情页
│   └── ...                 # 后续按需创建
└── online_tools/           # 在线工具子模块（❄️ 冻结，不再新增）
    ├── index.html          # 工具集首页 — 分类导航
    ├── css/                # style.css / main.css / tool.css / mobile.css
    ├── js/                 # 工具用库
    ├── img/                # 图标
    └── *.htm               # 各工具页（~37 个，冻结）
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

### 动效系统（animations.js）

| 动效 | 实现 | 触发 |
|---|---|---|
| 噪点纹理 | SVG feTurbulence + multiply 混合（CSS） | 全局常驻 |
| 鼠标光晕 | radial-gradient + requestAnimationFrame lerp（JS） | 全局跟随 |
| 字符拆分入场 | `[data-split]` → JS 逐字 `<span class="char">` | Hero 标题 |
| IntersectionObserver | `[data-reveal]` / `[data-split]` / `.card` 滚动触发 `.is-in` | 所有卡片/区块 |
| 3D 倾斜 + 光斑 | `[data-tilt]` → mousemove 计算 rotateX/Y + CSS `--mx`/`--my` | 卡片悬停 |
| 导航滚动实底 | scroll > 8px → `.is-scrolled` + backdrop-filter blur | 顶部导航 |
| 下划线滑入 | `::after` scaleX(0→1) + transform-origin 切换（CSS） | 导航链接 |
| 减少动效 | `prefers-reduced-motion` 媒体查询全局关闭（CSS） | 无障碍 |

---

## 卡片系统（数据驱动）

卡片通过 JS 数组驱动渲染。**配置在 `works.js`，图标映射在 `icons.js`，渲染在 `renderer.js`，动效在 `animations.js`**。四个文件职责分离，增删改项目只需编辑 `works.js`，不碰其他文件。

### 数据字段

```js
{
  // ── 基础信息 ──
  id: 'invoice',              // 唯一标识（对应 ICONS 图标映射）
  title: '发票打印系统',        // 卡片标题
  desc: '...',                 // 描述文字
  icon: 'invoice',             // 图标 ID（见 main.js ICONS 对象）

  // ── 展示控制 ──
  pinned: true,                // 置顶：pinned 项目始终排在最前
  featured: true,              // 精选：跨双列 + 渐变背景，仅一个生效
  tags: [                      // 标签数组
    { text: '主推', color: 'accent' },
    { text: '桌面', color: 'mute' }
  ],

  // ── 卡片动作 ★ ──
  action: 'detail',            // 'detail'（跳详情页）| 'open'（直接打开）| 'link'（跳外链）
  detail: 'works/invoice.html',// 详情页路径（action='detail' 时用）
  link: '#',                   // 直接链接（action='open'/'link' 时用）/ 备用

  // ── 元信息 ──
  stack: 'Tauri 2 · Rust · JS',// 技术栈（显示在卡片 footer）
  repo: 'erma0/invoice-sauce', // GitHub 仓库（可选，详情页显示）
  status: 'active',            // 'active'|'wip'|'archived'（可选，影响卡片透明度）
  note: '非原创...'            // 备注行（可选，斜体弱化）
}
```

### action 字段驱动规则

`action` 只控制卡片上的操作行为，**不约束详情页内容**。详情页是独立 HTML，完全自由。

| action | 卡片链接 | 按钮文字 | 外链 | 典型场景 |
|---|---|---|---|---|
| `detail` | `detail` 或 `link` | 查看 → | 否 | 有详情页的项目 |
| `open` | `link` 直接 | 打开 → | 否 | 站内工具集、在线服务 |
| `link` | `link` 外链 | 访问 → | 是 | 博客、GitHub、外部服务 |

链接解析优先级：`detail`（非空且非 `#`）→ `link` → `#`（禁用）

### 标签系统

| color 值 | 效果 | 适用 |
|---|---|---|
| `'accent'` | 朱砂红底，醒目 | 主推、精选 |
| `'mute'` | 灰底，低调 | 工具、预告、复刻、外链等常规标记 |

### 排序规则

1. `pinned: true` → 置顶组（保持数组顺序）
2. `pinned: false` → 普通组（保持数组顺序）
3. `featured: true` → 加 `card--feature` 类（跨双列、渐变背景）
4. 多个 `featured: true` 时只有第一个生效

### 图标系统

图标 ID 与 SVG 代码的映射定义在 `icons.js` 的 `window.__ICONS` 对象中。所有图标统一 24×24 viewBox，描边风格（`fill="none" stroke="currentColor" stroke-width="1.5"`）。

添加新图标：
```js
// 在 icons.js 的 window.__ICONS 对象中添加一条
newIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">...</svg>',
```

---

## 详情页系统

每个作品可拥有独立详情页，放在 `works/` 目录下。结构与主页同源，共享 `styles.css` 和字体，额外加载 `works/detail.css`。

### 详情页模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <!-- 字体 + 全局样式 + 详情页样式 -->
  <link rel="stylesheet" href="../styles.css" />
  <link rel="stylesheet" href="detail.css" />
</head>
<body>
  <div class="grain" aria-hidden="true"></div>
  <div class="detail">
    <a href="../" class="detail-back">← 作品集</a>
    <header class="detail-head">
      <h1>项目名</h1>
      <div class="detail-meta">
        <span class="detail-type desktop">桌面应用</span>
        <span>技术栈</span>
      </div>
    </header>
    <div class="detail-body">
      <!-- 自由内容：截图、下载、功能介绍、GitHub 链接 -->
    </div>
  </div>
  <footer class="site-footer">...</footer>
</body>
</html>
```

### 可用的 detail.css 组件

| 类名 | 用途 |
|---|---|
| `.detail` | 详情页容器（max-width + padding） |
| `.detail-back` | 返回链接 |
| `.detail-head` / `.detail-meta` / `.detail-type` | 标题 + 元信息 + 类型徽标 |
| `.detail-body` | 正文容器 |
| `.detail-screens` | 截图网格（auto-fit 自适应列） |
| `.detail-downloads` | 下载按钮 flex 容器 |
| `.btn-dl` | 下载按钮（带图标的 JetBrains Mono 等宽按钮） |
| `.detail-repo` | GitHub 仓库链接 |
| `.detail-placeholder` | 占位区域（截图位未补时的虚线框） |

### 新增项目的完整流程

1. 在 `works.js` 对应位置插入配置项（设置 `action` + `detail`）
2. 如需要详情页：复制 `works/invoice.html` 为模板，改内容
3. 如需要新图标：在 `main.js` 的 `ICONS` 中添加 SVG

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
编辑 `works.js` 中 `window.__WORKS` 数组：
- **新增**：在合适位置插入一个新对象
- **修改**：直接改对应字段
- **删除**：移除整个对象
- **置顶**：改 `pinned: true`
- **主推**：改 `featured: true`（记得把前一个的 `featured` 关掉）

### 新增在线工具页
1. 在 `online_tools/` 下创建 `tool_name.htm`
2. 复用 `online_tools/css/tool.css` 和现有 JS 库
3. 保持暗色主题风格
4. 在 `online_tools/index.html` 对应分类下添加链接

### 修改样式 / JS
- 全局样式 → `styles.css`（CSS 变量在 `:root` 统一管理）
- 详情页样式 → `works/detail.css`
- 工具页样式 → `online_tools/css/style.css`
- 单工具页公用 → `online_tools/css/tool.css`
- 图标映射 → `icons.js`（`window.__ICONS`）
- 卡片渲染 → `renderer.js`（数据驱动 DOM 生成）
- 动效系统 → `animations.js`（IO/tilt/glow/split）

### 配置新项目
编辑 `works.js`：在合适位置插入配置对象，设置 `action`、`detail`、`tags` 等字段。
如需要详情页：在 `works/` 下新建 HTML，复制 `works/detail-template.html`，替换 `<!-- -->` 标记内容。

### 添加新图标
在 `icons.js` 的 `window.__ICONS` 对象中添加一项，key 与 `works.js` 中的 `icon` 字段对应。

### 部署
- 推送 Git → Vercel 自动部署（默认即可服务多页面静态文件，无需 rewrite）
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

---

## online_tools/ 冻结声明

`online_tools/` 是历史复刻工具集（~37 个独立 `.htm`），**不再新增工具页**。

若需新增在线工具，应新建独立项目或采用配置驱动模板（见下方"出路"），不在本目录下堆砌。

### 出路

- **接受现状**：本目录保持冻结，只修 bug，不新增
- **模板化**（未实施）：用 `tools.json` 配置 + 一个通用模板页渲染所有工具，消灭 37 个重复 HTML
  - 触发条件：工具数量继续增长或需要统一改样式时
  - 当前状态：❄️ 冻结，暂不实施

---

## 架构变更记录

| 日期 | 变更 |
|---|---|
| 2026-06-12 | `main.js` 拆分为 `icons.js` + `renderer.js` + `animations.js`；`index.html` 脚本全部加 `defer`；新增 `works/detail-template.html`；`online_tools/` 冻结 |
