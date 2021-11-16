import FS from 'fs-extra';
import path from 'path';
import { create } from 'markdown-to-html-cli';

const deployDir = path.resolve(process.cwd(), 'web');
const mdPath = path.resolve(process.cwd(), 'README.md');
const htmlPath = path.resolve(process.cwd(), 'web', 'index.html');

const style = `
span.charset { background: #fff9c0; }
span.range { border: 1px dotted; border-color: transparent;}
span.range:hover { border: 1px dotted #0037f9; }
div.regex { margin-top: 10px; display: flex; align-items: center; position: relative; }
div.regex input {
  outline: none;
  border: none;
  padding: 4px 6px;
  padding-right: 60px;
  border-radius: 3px;
  box-sizing: border-box;
  line-height: 18px;
  flex: 1;
}
div.regex input.success { box-shadow: 0 0 0 1px #ffffff, 0 0 0 3px #15ae3c, inset 0 1px 1px rgb(16 22 26 / 0%) !important; }
div.regex input.danger { box-shadow: 0 0 0 1px #ffffff, 0 0 0 3px #e91e63, inset 0 1px 1px rgb(16 22 26 / 0%) !important; }
div.regex input:hover { box-shadow: 0 0 0 1px #ffffff, 0 0 0 3px rgb(55 109 217 / 21%), inset 0 1px 1px rgb(16 22 26 / 0%); }
div.regex span.success,
div.regex span.danger { position: absolute; right: 1px; padding: 2px 3px; border-radius: 2px; }
div.regex span.success {
  color: #00ad36;
  background-color: #cef3cf;
  margin-left: 10px;
}
div.regex span.danger {
  color: #cb0649;
  background-color: #fbdcdc;
  margin-left: 10px;
}

.markdown-body pre {
  position: relative;
}
.markdown-body pre[class*="language-regex"] {
  overflow: initial;
}
.markdown-body pre[class*="language-regex"]:hover .issue {
  visibility: visible;
}
.markdown-body pre[class*="language-regex"] .issue {
  visibility: hidden;
  position: absolute;
  right: 3px;
  margin-top: -28px;
  font-size: 12px;
}
.markdown-body pre[class*="language-regex"] .issue a {
  background: #ff5722;
  padding: 3px 5px;
  border-radius: 2px;
  color: #fff;
}
.markdown-body pre[class*="language-regex"] .issue a + a {
  margin-left: 5px;
}
.markdown-body pre[class*="language-regex"] .issue a.copy {
  background: #2196f3;
}
.markdown-body pre[class*="language-regex"] .issue a.copied {
  background: #4caf50;
}
.markdown-body pre > code[class*="language-regex"] {
  word-break: break-all !important;
  white-space: initial !important;
}
`;

const script = `
Array.from(document.getElementsByTagName('input')).forEach((elm) => {
  const code = (elm.dataset.code || '').replace(/\\n/g, '');
  elm.oninput = (evn) => {
    const isChecked = new RegExp(code).test(evn.target.value);
    elm.className = isChecked ? 'success' : 'danger';
    if (elm.nextSibling) {
      elm.nextSibling.innerHTML = isChecked ? '通过' : '×不通过'
      elm.nextSibling.className = isChecked ? 'success' : 'danger';
    }
  }
});

function copied(target, str = '') {
  target.classList.add('copied')
  target.innerHTML = '复制成功!';
  copyTextToClipboard(str, function() {
    setTimeout(() => {
      target.innerHTML = '点击复制';
      target.classList.remove('copied')
    }, 2000);
  });
}
`;

const getRegCode = (arr = []) => arr.map(item => {
  if (item.type === 'text') {
    return item.value;
  }
  if (item.children) {
    return getRegCode(item.children);
  }
  return item
}).filter(Boolean).flat().join('');

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
          className: 'copy',
          onclick: `copied(this, "${copied}")`,
          href: `javascript: this;`
        },
        children: [
          {
            type: 'text',
            value: '点击复制'
          }
        ]
      },
      {
        type: 'element',
        tagName: 'a',
        properties: {
          target: '__blank',
          href: `https://github.com/jaywcjlove/regexp-example/issues/new?labels=bug,enhancement&assignees=jaywcjlove&body=❌正则：~~\`${copied}\`~~&title=修改实例：xxx`
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

const options = {
  'github-corners': 'https://github.com/jaywcjlove/regexp-example.git',
  document: {
    style, script,
    js: 'https://unpkg.com/@uiw/copy-to-clipboard/dist/copy-to-clipboard.umd.js',
    link: [
      // { rel: 'shortcut icon', href: './favicon.ico' },
    ]
  },
  rewrite: (node, index, parent) => {
    if (node.tagName === 'pre' && node.properties.className) {
      const lang = Array.isArray(node.properties.className) ? node.properties.className.join('') : node.properties.className;
      if (/-regex$/.test(lang)) {
        const regCode = node.children[0];
        const regStr = getRegCode(regCode.children).replace(/\n/, '');
        // console.log('parent:', parent)
        // console.log('node:', node)
        // console.log('index:', parent[index-1])
        node.children = [ toolbar(regStr), ...node.children, input(regStr) ];
      }
    }
  }
}

;(async () => {
  await FS.ensureDir(deployDir);
  await FS.emptyDir(deployDir);
  const mdStr = (await FS.readFile(mdPath)).toString();
  const html = await create({
    ...options,
    markdown: mdStr,
    document: {
      title: "RegExp Example",
      ...options.document,
      meta: [
        { description: 'RegExp Example.' },
        { keywords: 'RegExp,example' }
      ]
    }
  });
  await FS.writeFile(htmlPath, html);
})();