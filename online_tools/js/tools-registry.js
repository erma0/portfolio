/**
 * tools-registry.js — 工具元数据注册表
 * 集中管理所有在线工具的名称、描述、分类
 * 供 index.html 动态渲染工具网格
 */
window.__TOOLS = [
  {
    id: 'codec',
    cn: '编码 / 解码',
    en: 'Codec',
    tools: [
      { id: 'text_to_base64', file: 'text_to_base64.htm', title: '文本 \u2192 Base64', desc: '将文本编码为 Base64' },
      { id: 'base64', file: 'base64.htm', title: 'Base64 \u2194 十六进制', desc: 'Base64 与十六进制互转' },
      { id: 'base64_pem', file: 'base64_pem.htm', title: 'Base64 \u2194 PEM', desc: 'Base64 与 PEM 格式互转' },
      { id: 'base32', file: 'base32.htm', title: 'Base32 \u2194 十六进制', desc: 'Base32 与十六进制互转' },
      { id: 'base32hex', file: 'base32hex.htm', title: 'Base32hex \u2194 十六进制', desc: 'Base32hex 与十六进制互转' },
      { id: 'base64_multi', file: 'base64_multi.htm', title: '批量 Base64 \u2192 十六进制', desc: '批量 Base64 解码为十六进制' },
      { id: 'hex_to_base32_multi', file: 'hex_to_base32_multi.htm', title: '批量十六进制 \u2192 Base32', desc: '批量十六进制编码为 Base32' },
    ]
  },
  {
    id: 'radix',
    cn: '进制 / 数值转换',
    en: 'Radix',
    tools: [
      { id: 'ascii', file: 'ascii.htm', title: 'ASCII \u2194 十六进制', desc: 'ASCII 与十六进制互转' },
      { id: 'hex_to_dec', file: 'hex_to_dec.htm', title: '十六进制 \u2192 十进制', desc: '十六进制转十进制' },
      { id: 'dec_to_ascii', file: 'dec_to_ascii.htm', title: '十进制 \u2192 ASCII', desc: '十进制转 ASCII 字符' },
      { id: 'ascii_uN', file: 'ascii_uN.htm', title: 'ASCII \u2192 Unicode HEX', desc: 'ASCII 字符转 Unicode 十六进制' },
      { id: 'bin_to_32bit_hex', file: 'bin_to_32bit_hex.htm', title: '二进制 \u2194 32位十六进制', desc: '二进制与 32 位十六进制互转' },
    ]
  },
  {
    id: 'crypto',
    cn: '哈希 / 加密',
    en: 'Crypto',
    tools: [
      { id: 'md5', file: 'md5.htm', title: 'MD5 计算器', desc: '计算文本或文件的 MD5 哈希值' },
      { id: 'sha1', file: 'sha1.htm', title: 'SHA1 计算器', desc: '计算文本或文件的 SHA1 哈希值' },
      { id: 'crc8', file: 'crc8.htm', title: 'CRC8 校验', desc: '计算数据的 CRC8 校验值' },
      { id: 'rc4', file: 'rc4.htm', title: 'RC4 加密', desc: 'RC4 流密码加密与解密' },
      { id: 'xor', file: 'xor.htm', title: 'XOR 异或运算', desc: '十六进制数据异或运算' },
      { id: 'inv', file: 'inv.htm', title: '位反转', desc: '按位取反运算' },
    ]
  },
  {
    id: 'data',
    cn: '文件 / 数据处理',
    en: 'Data',
    tools: [
      { id: 'file_to_hex', file: 'file_to_hex.htm', title: '文件 \u2192 十六进制', desc: '将文件内容转为十六进制' },
      { id: 'hex_to_file', file: 'hex_to_file.htm', title: '十六进制 \u2192 文件', desc: '将十六进制数据下载为文件' },
      { id: 'file_to_base64', file: 'file_to_base64.htm', title: '文件 \u2192 Base64', desc: '将文件内容编码为 Base64' },
      { id: 'unique_str', file: 'unique_str.htm', title: '去重 / 排序', desc: '文本行去重与排序' },
      { id: 'bin_decoder', file: 'bin_decoder.htm', title: '二进制解码器', desc: '二进制数据解码' },
    ]
  },
  {
    id: 'text',
    cn: '代码 / 文本',
    en: 'Text',
    tools: [
      { id: 'cpp_text_escape', file: 'cpp_text_escape.htm', title: '文本 \u2192 C++ 转义', desc: '将文本转为 C++ 字符串转义' },
      { id: 'cpp_unescape', file: 'cpp_unescape.htm', title: 'C++ 转义 \u2192 文本', desc: '将 C++ 转义字符串还原' },
      { id: 'pascal_escape', file: 'pascal_escape.htm', title: '文本 \u2192 Pascal 转义', desc: '将文本转为 Pascal 字符串转义' },
      { id: 'regexp', file: 'regexp.htm', title: '正则表达式测试', desc: '在线测试正则表达式匹配' },
      { id: 'html_list_gen', file: 'html_list_gen.htm', title: '文本 \u2192 HTML 列表', desc: '将文本行转为 HTML 列表' },
    ]
  },
  {
    id: 'misc',
    cn: '其他工具',
    en: 'Misc',
    tools: [
      { id: 'wave_gen', file: 'wave_gen.htm', title: 'WAVE 音频生成器', desc: '生成 WAVE 音频文件' },
      { id: 'par_resistors', file: 'par_resistors.htm', title: '并联电阻计算器', desc: '计算并联电阻组合' },
      { id: 'diskstats', file: 'diskstats.htm', title: '/proc/diskstats 格式化', desc: '格式化 Linux 磁盘统计' },
    ]
  },
];
