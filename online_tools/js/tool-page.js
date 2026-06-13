/**
 * tool-page.js — 工具页公共框架
 * 自动渲染页面外壳（grain/nav/header/footer），提供表单组件工厂函数
 *
 * 用法:
 *   ToolPage.render({
 *     title: '工具标题',
 *     desc: '工具描述',
 *     body: function(bodyEl) { ... }
 *   });
 */
var ToolPage = (function () {
  'use strict';

  /* ---- 常量 ---- */
  var FONTS_HREF = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap';
  var COPYRIGHT = '\u00A9鸽子笼 2020-2026';

  /* ---- DOM 辅助 ---- */
  function el(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }
  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  /* ---- 注入 <head> 资源 ---- */
  function injectHead(extraCSS) {
    var head = document.head;
    // Fonts preconnect
    var pc1 = el('link'); pc1.rel = 'preconnect'; pc1.href = 'https://fonts.googleapis.com'; head.appendChild(pc1);
    var pc2 = el('link'); pc2.rel = 'preconnect'; pc2.href = 'https://fonts.gstatic.com'; pc2.crossOrigin = ''; head.appendChild(pc2);
    // Fonts CSS
    var fonts = el('link'); fonts.rel = 'stylesheet'; fonts.href = FONTS_HREF; head.appendChild(fonts);
    // Main styles
    var mainCSS = el('link'); mainCSS.rel = 'stylesheet'; mainCSS.href = '../styles.css'; head.appendChild(mainCSS);
    // Tool styles
    var toolCSS = el('link'); toolCSS.rel = 'stylesheet'; toolCSS.href = './css/tool.css'; head.appendChild(toolCSS);
    // Extra CSS
    if (extraCSS) {
      var x = el('link'); x.rel = 'stylesheet'; x.href = extraCSS; head.appendChild(x);
    }
  }

  /* ---- 渲染页面外壳 ---- */
  function render(config) {
    injectHead(config.extraCSS);

    // Grain
    var grain = el('div', 'grain');
    grain.setAttribute('aria-hidden', 'true');
    document.body.prepend(grain);

    // Main container
    var main = el('main', 'container');

    // Nav
    var nav = el('nav', 'top-nav');
    nav.innerHTML = '<a href="../index.html" class="back-link">\u2190 作品集</a><a href="./index.html">\u2190 工具列表</a>';
    main.appendChild(nav);

    // Header
    var header = el('header', 'tool-header');
    header.innerHTML = '<h1>' + esc(config.title) + '</h1>' +
      (config.desc ? '<p class="tool-desc">' + esc(config.desc) + '</p>' : '');
    main.appendChild(header);

    // Tool body
    var body = el('section', 'tool-body');
    if (config.body) config.body(body);
    main.appendChild(body);

    // Footer
    var footer = el('footer', 'page-footer');
    footer.innerHTML = '<p class="copyright">' + COPYRIGHT + '</p>';
    main.appendChild(footer);

    document.body.appendChild(main);
  }

  /* ============ 组件工厂 ============ */

  /** 创建 .form-card 容器 */
  function formCard() {
    return el('div', 'form-card');
  }

  /** 创建 .field 组（标签 + 内容 + 提示） */
  function field(label, hint, content) {
    var div = el('div', 'field');
    if (label) {
      var lbl = el('span', 'field-label');
      lbl.textContent = label;
      div.appendChild(lbl);
    }
    if (content) div.appendChild(typeof content === 'string' ? document.createTextNode(content) : content);
    if (hint) {
      var h = el('span', 'field-hint');
      h.textContent = hint;
      div.appendChild(h);
    }
    return div;
  }

  /** 创建 .input-row（输入框 + 复制按钮） */
  function inputRow(id, opts) {
    opts = opts || {};
    var row = el('div', 'input-row');
    var input = document.createElement('input');
    input.type = opts.type || 'text';
    input.id = id;
    input.name = id;
    if (opts.value != null) input.value = opts.value;
    if (opts.readonly) input.readOnly = true;
    if (opts.placeholder) input.placeholder = opts.placeholder;
    if (opts.maxlength) input.maxLength = opts.maxlength;
    row.appendChild(input);
    row.appendChild(_copyBtn(input));
    return row;
  }

  /** 创建 .input-row（textarea + 复制按钮） */
  function textareaRow(id, opts) {
    opts = opts || {};
    var row = el('div', 'input-row');
    var ta = document.createElement('textarea');
    ta.id = id;
    ta.name = id;
    ta.rows = opts.rows || 4;
    if (opts.value != null) ta.value = opts.value;
    if (opts.readonly) ta.readOnly = true;
    if (opts.placeholder) ta.placeholder = opts.placeholder;
    row.appendChild(ta);
    row.appendChild(_copyBtn(ta));
    return row;
  }

  /** 创建 .result-card（标签 + 值区域） */
  function resultCard(id, label) {
    var card = el('div', 'result-card');
    if (label) {
      var lbl = el('span', 'field-label');
      lbl.textContent = label;
      card.appendChild(lbl);
    }
    var val = el('div', 'result-value');
    val.id = id;
    card.appendChild(val);
    return card;
  }

  /** 创建复选框 label */
  function checkbox(id, label, checked) {
    var lbl = document.createElement('label');
    lbl.style.cssText = 'display:flex;align-items:center;gap:0.3rem;cursor:pointer;font-size:0.85rem;color:var(--ink-soft)';
    var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = id;
    cb.name = id;
    if (checked) cb.checked = true;
    lbl.appendChild(cb);
    lbl.appendChild(document.createTextNode(label));
    return lbl;
  }

  /** 创建按钮组 */
  function btnGroup(buttons) {
    var div = el('div', 'btn-group');
    (buttons || []).forEach(function (b) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = b.text;
      if (b.className) btn.className = b.className;
      if (b.onclick) btn.addEventListener('click', b.onclick);
      div.appendChild(btn);
    });
    return div;
  }

  /** 创建文件选择字段 */
  function fileField(id, label) {
    var div = el('div', 'field');
    if (label) {
      var lbl = el('span', 'field-label');
      lbl.textContent = label;
      div.appendChild(lbl);
    }
    var input = document.createElement('input');
    input.type = 'file';
    input.id = id;
    input.name = id;
    div.appendChild(input);
    return div;
  }

  /** 创建拖拽区域 */
  function dropZone(id, text) {
    var div = el('div', 'drop-zone');
    div.id = id;
    div.textContent = text || '拖拽文件到此处，或点击选择文件';
    return div;
  }

  /** 创建下拉选择 */
  function select(id, options, selected) {
    var sel = document.createElement('select');
    sel.id = id;
    sel.name = id;
    (options || []).forEach(function (opt) {
      var o = document.createElement('option');
      if (typeof opt === 'object') { o.value = opt.value; o.textContent = opt.label || opt.value; }
      else { o.value = opt; o.textContent = opt; }
      if (o.value === selected) o.selected = true;
      sel.appendChild(o);
    });
    return sel;
  }

  /** 创建分隔线 */
  function divider() {
    return el('hr');
  }

  /* ---- 内部：复制按钮 ---- */
  function _copyBtn(inputEl) {
    var btn = el('button', 'btn-copy');
    btn.type = 'button';
    btn.innerHTML = ICON_COPY;
    btn.setAttribute('aria-label', '复制');
    btn.addEventListener('click', function () {
      copyToClipboard(inputEl.value);
    });
    return btn;
  }

  /* ---- 自动布线 ---- */
  function wireCopyButtons(root) {
    (root || document).querySelectorAll('.btn-copy').forEach(function (btn) {
      if (btn.dataset.wired) return;
      btn.dataset.wired = '1';
      if (!btn.innerHTML.trim()) btn.innerHTML = ICON_COPY;
      var input = btn.parentElement.querySelector('input, textarea');
      if (input && !btn.onclick) {
        btn.addEventListener('click', function () { copyToClipboard(input.value); });
      }
    });
  }

  /* ---- 导出 ---- */
  return {
    render: render,
    formCard: formCard,
    field: field,
    inputRow: inputRow,
    textareaRow: textareaRow,
    resultCard: resultCard,
    checkbox: checkbox,
    btnGroup: btnGroup,
    fileField: fileField,
    dropZone: dropZone,
    select: select,
    divider: divider,
    wireCopyButtons: wireCopyButtons,
    el: el,
    esc: esc,
  };
})();
