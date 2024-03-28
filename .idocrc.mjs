import FS from 'fs-extra';
import path from 'path';

const style = FS.readFileSync(path.resolve(process.cwd(), 'scripts/style.css')).toString();
const script = `
const inputs = document.querySelector('markdown-style').querySelectorAll('input');
Array.from(inputs).forEach((elm) => {
  const code = (elm.dataset.code || '').replace(/\\n/g, '');
  elm.oninput = (evn) => {
    const isChecked = new RegExp(code).test(evn.target.value);
    elm.className = isChecked ? 'success' : 'danger';
    if (elm.nextSibling) {
      elm.nextSibling.innerHTML = isChecked ? '通过' : '×不通过'
      elm.nextSibling.className = isChecked ? 'success' : 'danger';
    }
  }
});`;

const getCodeStr = (data = [], code = '') => {
  data.forEach((node) => {
    if (node.type === 'text') {
      code += node.value;
    } else if (node.type === 'element' && node.children && Array.isArray(node.children)) {
      code += getCodeStr(node.children);
    }
  });
  return code;
};

const input = (code) => {
  return {
    type: 'element',
    tagName: 'div',
    properties: { className: 'regex', },
    children: [
      {
        type: 'element',
        tagName: 'input',
        properties: {
          type: 'text', value: '', placeholder: '请输入下方【E.g】字符串验证实例', 'data-code': code || '',
        },
      },
      {
        type: 'element',
        tagName: 'span',
        properties: { className: 'info' },
      }
    ]
  }
}

const toolbar = (copied) => {
  return {
    type: 'element',
    tagName: 'div',
    properties: { className: 'issue' },
    children: [
      {
        type: 'element',
        tagName: 'a',
        properties: {
          target: '__blank',
          className: 'share',
          href: `https://jaywcjlove.github.io/regexp-example/regulex/index.html#!flags=&re=${encodeURIComponent(copied)}`
        },
        children: [
          { type: 'text', value: '分享例子' }
        ]
      },
      {
        type: 'element',
        tagName: 'a',
        properties: {
          target: '__blank',
          href: `https://github.com/jaywcjlove/regexp-example/issues/new?labels=bug,enhancement&assignees=jaywcjlove&body=❌ 正则：~~\`${copied}\`~~%0a✅ 正则：\`正则示例\`&title=修改实例：xxx`
        },
        children: [
          { type: 'text', value: '🐞修改正则' }
        ]
      }
    ],
  }
}

const createLink = () => ([
  {
    type: 'element',
    tagName: 'a',
    properties: {
      className: 'btn create',
      target: '__blank',
      href: `https://github.com/jaywcjlove/regexp-example/issues/new?labels=new,enhancement&assignees=jaywcjlove&body=<!--新增正则实例说明-->&title=新增实例：xxx`
    },
    children: [
      { type: 'text', value: '分享例子' }
    ]
  },
]);

const stylestr =`
.language-regex span.range { border: 1px dotted; border-color: transparent; color: var(--color-prettylights-syntax-meta-diff-range); }
.language-regex span.range:hover { border: 1px dotted var(--color-prettylights-syntax-brackethighlighter-unmatched); }
.language-regex span.char-class { color: var(--color-prettylights-syntax-markup-inserted-text); }
.language-regex .token.punctuation { color: var(--color-prettylights-syntax-markup-changed-text); }
.language-regex .token.group { color: var(--color-prettylights-syntax-carriage-return-bg); }
.language-regex .token.char-set,
.language-regex .token.number,
.language-regex .token.range,
.language-regex .token.anchor { font-weight: bold; }
.language-regex .token.anchor { color: var(--color-prettylights-syntax-markup-inserted-text); }

span.charset { background: #fff9c0; }
div.regex { display: flex; align-items: center; position: relative; padding: 0 10px 10px 10px;}
div.regex input {
  transition: all .5s;
  outline: none;
  border: none;
  padding: 4px 6px;
  padding-right: 60px;
  border-radius: 3px;
  box-sizing: border-box;
  line-height: 18px;
  flex: 1;
}
div.regex input::placeholder {
  color: var(--color-fg-muted);
}
div.regex input.success { box-shadow: 0 0 0 1px #ffffff, 0 0 0 3px #15ae3c, inset 0 1px 1px rgb(16 22 26 / 0%) !important; }
div.regex input.danger { box-shadow: 0 0 0 1px #ffffff, 0 0 0 3px #e91e63, inset 0 1px 1px rgb(16 22 26 / 0%) !important; }
div.regex input:hover { box-shadow: 0 0 0 1px #ffffff, 0 0 0 3px rgb(55 109 217 / 21%), inset 0 1px 1px rgb(16 22 26 / 0%); }
div.regex span.success,
div.regex span.danger { position: absolute; right: 3px; line-height: 16px; padding: 2px 5px; border-radius: 4px; margin-right: 10px; }
div.regex span.success {
  color: #00ad36;
  background-color: #cef3cf;
}
div.regex span.danger {
  color: #cb0649;
  background-color: #fbdcdc;
  margin-left: 10px;
}
markdown-style pre[class*="language-regex"] span.anchor {
  float: initial;
  padding-right: initial;
  margin-left: initial;
}
markdown-style pre[class*="language-regex"] {
  overflow: initial;
  transition: background-color .5s;
  border-radius: 6px;
}
markdown-style pre[class*="language-regex"] code {
  background-color: transparent;
}
markdown-style pre[class*="language-regex"]:hover {
  background-color: var(--color-border-muted);
}
markdown-style pre[class*="language-regex"]:hover .issue {
  visibility: visible;
}
markdown-style pre[class*="language-regex"]:hover .issue a {
  transition: opacity .5s;
  opacity: 1;
}
markdown-style pre[class*="language-regex"] .issue {
  position: absolute;
  right: 3px;
  margin-top: -16px;
  padding: 0 0 5px 0;
  font-size: 12px;
}
markdown-style pre[class*="language-regex"] .issue a {
  background: #ff5722;
  padding: 3px 5px;
  border-radius: 2px;
  color: #fff;
  opacity: 0.15;
}
markdown-style pre[class*="language-regex"] .issue a + a {
  margin-left: 5px;
}
markdown-style pre[class*="language-regex"] .issue a.share {
  background: #009688;
}
markdown-style pre[class*="language-regex"] .issue a.copied {
  background: #4caf50;
}
markdown-style pre > code[class*="language-regex"] {
  word-break: break-all !important;
  white-space: initial !important;
}
markdown-style h2 {
  border-bottom: 0 !important;
}
${style}
`;

const styleElement = {
  type: 'element',
  properties: {},
  tagName: 'style',
  children: [
    { type: 'text', value: stylestr, }
  ]
}

/** @type {Array<string>} */
const meta = [
  '<meta name="author" content="Kenny Wong">',
  '<meta property="og:site_name" content="<%= site %>">',
  '<meta property="og:url" content="<%=homepage%><%=RESOLVE_PATH%>">',
  // '<meta property="og:image" content="<%=homepage%>assets/logo.png">',
  '<meta property="og:type" content="application">',
  '<meta property="og:title" content="<%= site %>">',
  '<meta property="og:description" content="<%= description%>">',
]
/**
 * @typedef {import("idoc").Config} Config
 * @type {Config} 
 */
export default {
  output: "dist",
  site: "RegExp Example 正则实例",
  menus: {
    "赞助":  {
      url: "https://jaywcjlove.github.io/#/sponsor",
      target: "__blank"
    }
  },
  meta,
  rewrite: (node) => {
    if ((node.type === 'comment' && node.value === 'regulex') || (node.type === 'raw' && node.value === '<!--regulex-->')) {
      node.type = 'element';
      node.tagName = 'iframe';
      node.properties = {
        style: 'border: 0; width: 100%; min-height: 370px; margin-bottom: 16px; border-radius: 6px; background: #edf2f5;',
        src: 'regulex/index.html',
        visible: 0,
      }
    }
    if (node.type === "root") {
      node.children = [ ...createLink(), ...node.children];
      node.children.push(styleElement)
      node.children.push({
        type: 'element', tagName: 'script',
        properties: {},
        children: [{
          type: 'text',
          value: script
        }]
      });
    }
    if (node.tagName === 'pre' && node.properties.className) {
      const lang = Array.isArray(node.properties.className) ? node.properties.className.join('') : node.properties.className;
      if (/-regex$/.test(lang)) {
        const regStr = getCodeStr(node.children);
        node.children = [ toolbar(regStr), ...node.children, input(regStr) ];
      }
    }
  }
}