import FS from 'fs-extra';
import path from 'path';
import { create } from 'markdown-to-html-cli';

const deployDir = path.resolve(process.cwd(), 'web');
const mdPath = path.resolve(process.cwd(), 'README.md');
const htmlPath = path.resolve(process.cwd(), 'web', 'index.html');
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
          {
            type: 'text',
            value: '分享例子'
          }
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
          {
            type: 'text',
            value: '🐞修改正则'
          }
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
      {
        type: 'text',
        value: '分享例子'
      }
    ]
  },
  {
    type: 'element',
    tagName: 'a',
    properties: {
      className: ['btn', 'totop'],
      href: '#totop'
    },
    children: [
      {
        type: 'text',
        value: 'Top'
      }
    ]
  }
]);

const stylestr =`
[data-color-mode*='dark'], [data-color-mode*='dark'] body {
  --color-header-bg: #ffffff4a;
}
[data-color-mode*='light'], [data-color-mode*='light'] body {
  --color-header-bg: #a4e7a6;
}

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
div.regex { margin-top: 10px; display: flex; align-items: center; position: relative; }
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
div.regex span.danger { position: absolute; right: 3px; line-height: 16px; padding: 2px 5px; border-radius: 4px; }
div.regex span.success {
  color: #00ad36;
  background-color: #cef3cf;
}
div.regex span.danger {
  color: #cb0649;
  background-color: #fbdcdc;
  margin-left: 10px;
}
.markdown-body pre[class*="language-regex"] span.anchor {
  float: initial;
  padding-right: initial;
  margin-left: initial;
}
.markdown-body pre[class*="language-regex"] {
  overflow: initial;
  transition: background-color .5s;
  border-radius: 6px;
}
.markdown-body pre[class*="language-regex"] code {
  background-color: transparent;
}
.markdown-body pre[class*="language-regex"]:hover {
  background-color: var(--color-header-bg);
}
.markdown-body pre[class*="language-regex"]:hover .issue {
  visibility: visible;
}
.markdown-body pre[class*="language-regex"]:hover .issue a {
  transition: opacity .5s;
  opacity: 1;
}
.markdown-body pre[class*="language-regex"] .issue {
  position: absolute;
  right: 3px;
  margin-top: -39px;
  padding: 0 0 5px 0;
  font-size: 12px;
}
.markdown-body pre[class*="language-regex"] .issue a {
  background: #ff5722;
  padding: 3px 5px;
  border-radius: 2px;
  color: #fff;
  opacity: 0.15;
}
.markdown-body pre[class*="language-regex"] .issue a + a {
  margin-left: 5px;
}
.markdown-body pre[class*="language-regex"] .issue a.share {
  background: #009688;
}
.markdown-body pre[class*="language-regex"] .issue a.copied {
  background: #4caf50;
}
.markdown-body pre > code[class*="language-regex"] {
  word-break: break-all !important;
  white-space: initial !important;
}
`;

const styleElement = {
  type: 'element',
  tagName: 'style',
  children: [
    {
      type: 'text',
      value: stylestr,
    }
  ]
}

const options = {
  'github-corners': 'https://github.com/jaywcjlove/regexp-example.git',
  document: {
    style,
    link: [
      // { rel: 'shortcut icon', href: './favicon.ico' },
    ]
  },
  rewrite: (node) => {
    if (node.type === 'comment' && node.value === 'regulex') {
      node.type = 'element';
      node.tagName = 'iframe';
      node.properties = {
        style: 'border: 0; width: 100%; min-height: 370px; margin-bottom: 16px; border-radius: 6px; background: #edf2f5;',
        src: 'regulex/index.html',
        visible: 0,
      }
    }
    if (node.type === 'element' && node.tagName === 'body') {
      node.properties = { ...node.properties, id: 'totop' };
      node.children = [ ...createLink(), ...node.children];
    }
    if (node.type === 'element' && node.tagName === 'markdown-style') {
      node.children.push(styleElement)
      node.children.push({
        type: 'element', tagName: 'script',
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

;(async () => {
  await FS.ensureDir(deployDir);
  await FS.emptyDir(deployDir);
  await FS.emptyDir(path.resolve(process.cwd(), 'web/regulex'));
  await FS.copyFile(path.resolve(process.cwd(), 'regulex/index.html'), path.resolve(process.cwd(), 'web/regulex/index.html'))
  const mdStr = (await FS.readFile(mdPath)).toString();
  const html = await create({
    ...options,
    markdown: mdStr,
    document: {
      title: "RegExp Example 正则实例大全",
      ...options.document,
      meta: [
        { description: '正则实例大全，正则表达式实例搜集，通过实例来学习正则表达式。' },
        { keywords: 'RegExp,example' }
      ]
    }
  });
  await FS.writeFile(htmlPath, html);
})();