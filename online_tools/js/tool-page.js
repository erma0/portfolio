/**
 * tool-page.js — 工具页公共组件库
 * 提供表单组件工厂函数和复制按钮自动布线
 *
 * 页面外壳（导航栏/页脚等）由各 .htm 静态 HTML 直出
 */
var ToolPage = (function () {
  'use strict';

  /* ---- 常量 ---- */
  var ICON_COPY = '⧉';

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
