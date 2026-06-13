/**
 * utils.js — 在线工具公共函数库
 * 纯函数 + DOM 辅助，无框架依赖
 *
 * 用法: <script src="./js/utils.js"></script>
 */

/* ---- 常量 ---- */
const HEX_DIGITS = '0123456789ABCDEF';
const BASE64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const BASE32HEX_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUV';

/* ---- 进制转换 ---- */

/** 十进制转十六进制字符串（自动补零到2位） */
function dec2hex(d, lowercase) {
  if (d < 0) d = 0;
  let h = '';
  do {
    h = HEX_DIGITS.charAt(d & 15) + h;
    d >>>= 4;
  } while (d > 0);
  if (h.length < 2) h = '0' + h;
  return lowercase ? h.toLowerCase() : h;
}

/** 十六进制字符串转十进制 */
function hex2dec(h) {
  return parseInt(h, 16);
}

/* ---- 字符串 / 十六进制互转 ---- */

/** 十六进制字符串转普通字符串（UTF-8 字节序列） */
function hex2str(hex) {
  let out = '';
  for (let i = 0; i < hex.length; i += 2) {
    out += String.fromCharCode(parseInt(hex.substring(i, i + 2), 16));
  }
  return out;
}

/** 普通字符串转十六进制字符串 */
function str2hex(str) {
  let out = '';
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    out += HEX_DIGITS.charAt((c >> 4) & 15) + HEX_DIGITS.charAt(c & 15);
  }
  return out;
}

/* ---- 十六进制清洗 ---- */

/** 清洗十六进制字符串：移除 0x 前缀、空格、换行等非十六进制字符 */
function cleanHex(input, remove0x) {
  let s = input.toUpperCase();
  if (remove0x) {
    s = s.replace(/0X/g, '');
  }
  return s.replace(/[^0-9A-F]/g, '');
}

/* ---- 验证 ---- */

/** 检查字符串是否为有效十六进制 */
function isValidHex(str) {
  return /^[0-9A-Fa-f]*$/.test(str);
}

/** 检查字符串长度是否为2字节的整数倍 */
function isEvenHexLength(str) {
  return str.length % 2 === 0;
}

/* ---- Base64 ---- */

/** Base64 解码为字节数组 */
function base64Decode(input) {
  const clean = input.replace(/[^A-Za-z0-9+\/=]/g, '');
  if (clean.length % 4 !== 0) return [];
  const output = [];
  let i = 0, j = 0;
  while (i < clean.length) {
    const e1 = BASE64_ALPHABET.indexOf(clean.charAt(i++));
    const e2 = BASE64_ALPHABET.indexOf(clean.charAt(i++));
    const e3 = BASE64_ALPHABET.indexOf(clean.charAt(i++));
    const e4 = BASE64_ALPHABET.indexOf(clean.charAt(i++));
    output[j++] = (e1 << 2) | (e2 >> 4);
    if (e3 !== 64) output[j++] = ((e2 & 15) << 4) | (e3 >> 2);
    if (e4 !== 64) output[j++] = ((e3 & 3) << 6) | e4;
  }
  return output;
}

/** 字节数组转 Base64 */
function base64Encode(bytes) {
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b1 = bytes[i] & 255;
    const b2 = i + 1 < bytes.length ? bytes[i + 1] & 255 : 0;
    const b3 = i + 2 < bytes.length ? bytes[i + 2] & 255 : 0;
    out += BASE64_ALPHABET.charAt(b1 >> 2);
    out += BASE64_ALPHABET.charAt(((b1 << 4) | (b2 >> 4)) & 63);
    out += i + 1 < bytes.length ? BASE64_ALPHABET.charAt(((b2 << 2) | (b3 >> 6)) & 63) : '=';
    out += i + 2 < bytes.length ? BASE64_ALPHABET.charAt(b3 & 63) : '=';
  }
  return out;
}

/* ---- Base32 ---- */

/** 字节数组转 Base32 */
function base32Encode(bytes) {
  let bits = 0, value = 0, out = '';
  for (let i = 0; i < bytes.length; i++) {
    value = (value << 8) | (bytes[i] & 255);
    bits += 8;
    while (bits >= 5) {
      out += BASE32_ALPHABET.charAt((value >>> (bits - 5)) & 31);
      bits -= 5;
    }
  }
  if (bits > 0) {
    out += BASE32_ALPHABET.charAt((value << (5 - bits)) & 31);
  }
  const pad = (8 - out.length % 8) % 8;
  for (let i = 0; i < pad; i++) out += '=';
  return out;
}

/** Base32 解码为字节数组 */
function base32Decode(input) {
  const clean = input.replace(/[^A-Z2-7=]/gi, '').toUpperCase();
  const output = [];
  let bits = 0, value = 0;
  for (let i = 0; i < clean.length; i++) {
    if (clean[i] === '=') break;
    const idx = BASE32_ALPHABET.indexOf(clean[i]);
    if (idx < 0) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      output.push((value >>> bits) & 255);
    }
  }
  return output;
}

/** 字节数组转 Base32hex */
function base32hexEncode(bytes) {
  return base32Encode(bytes).replace(/[A-Z2-7=]/g, function (c) {
    if (c === '=') return '=';
    const idx = BASE32_ALPHABET.indexOf(c);
    return idx >= 0 ? BASE32HEX_ALPHABET.charAt(idx) : c;
  });
}

/** Base32hex 解码为字节数组 */
function base32hexDecode(input) {
  const toStd = input.replace(/[0-9A-V]/gi, function (c) {
    const idx = BASE32HEX_ALPHABET.indexOf(c.toUpperCase());
    return idx >= 0 ? BASE32_ALPHABET.charAt(idx) : c;
  });
  return base32Decode(toStd);
}

/* ---- 字节数组工具 ---- */

/** 字节数组转十六进制字符串 */
function bytes2hex(bytes, separator, lowercase) {
  let out = '';
  for (let i = 0; i < bytes.length; i++) {
    if (separator && i > 0) out += separator;
    out += dec2hex(bytes[i], lowercase);
  }
  return out;
}

/** 十六进制字符串转字节数组 */
function hex2bytes(hex) {
  const out = [];
  for (let i = 0; i < hex.length; i += 2) {
    out.push(parseInt(hex.substring(i, i + 2), 16));
  }
  return out;
}

/* ---- 文件下载 ---- */

/** 从十六进制字符串创建并下载二进制文件 */
function createFileFromHex(cleanedHex, filename) {
  if (cleanedHex.length % 2) {
    showToast('错误：十六进制长度为奇数');
    return;
  }
  const bytes = hex2bytes(cleanedHex);
  const blob = new Blob([new Uint8Array(bytes)], { type: 'application/octet-stream' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename || 'file.bin';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

/* ---- DOM 辅助 ---- */

/** 安全设置元素文本（避免 XSS） */
function setText(el, text) {
  if (el) el.textContent = text;
}

/** 安全设置元素 HTML（仅在信任内容时使用） */
function setHTML(el, html) {
  if (el) el.innerHTML = html;
}

/** 获取表单元素的值（by name） */
function getVal(name) {
  const el = document.querySelector('[name="' + name + '"]');
  return el ? el.value : '';
}

/** 设置表单元素的值（by name） */
function setVal(name, val) {
  const el = document.querySelector('[name="' + name + '"]');
  if (el) el.value = val;
}

/** 复制文本到剪贴板并显示提示 */
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () {
      showToast('已复制');
    });
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showToast('已复制'); } catch (e) { showToast('复制失败'); }
    document.body.removeChild(ta);
  }
}

/** Toast 提示（如果页面未定义则提供默认实现） */
if (typeof showToast !== 'function') {
  function showToast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:var(--ink,#1a1a1a);color:var(--bg,#f6f3ec);padding:10px 24px;border-radius:8px;font-size:14px;z-index:9999;opacity:0;transition:opacity .3s';
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.style.opacity = '1'; });
    setTimeout(function () {
      t.style.opacity = '0';
      setTimeout(function () { t.remove(); }, 300);
    }, 2500);
  }
}
