/**
 * utils.js — 在线工具公共函数库
 * 纯函数，无 DOM 依赖，兼容 IE10+
 *
 * 用法: <script src="./js/utils.js"></script>
 */

/* ---- 常量 ---- */
const HEX_DIGITS = '0123456789ABCDEF';
const BASE64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

/* ---- 进制转换 ---- */

/** 十进制转十六进制字符串 */
function dec2hex(d, lowercase) {
    let h = HEX_DIGITS.charAt(d & 15);
    while (d > 15) {
        d >>>= 4;
        h = HEX_DIGITS.charAt(d & 15) + h;
    }
    return lowercase ? h.toLowerCase() : h;
}

/** 十六进制字符串转十进制 */
function hex2dec(h) {
    return parseInt(h, 16);
}

/* ---- 字符串/十六进制互转 ---- */

/** 十六进制字符串转普通字符串 */
function hex2str(hex) {
    let out = '';
    for (let i = 0; i < hex.length; i += 2) {
        out += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
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
        out.push(parseInt(hex.substr(i, 2), 16));
    }
    return out;
}

/* ---- DOM 辅助（如果可用） ---- */

/** 安全设置元素文本（避免 XSS） */
function setText(el, text) {
    if (el) el.textContent = text;
}

/** 安全设置元素 HTML（仅在信任内容时使用） */
function setHTML(el, html) {
    if (el) el.innerHTML = html;
}

/** 获取输入框的值 */
function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
}

/** 设置输入框的值 */
function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
}
