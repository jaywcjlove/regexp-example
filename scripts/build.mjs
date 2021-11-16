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
div.regex { margin-top: 10px; display: flex; justify-content: space-between; }
div.regex input {
  outline: none;
  border: none;
  padding: 4px 6px;
  border-radius: 3px;
  box-sizing: border-box;
  flex: 1;
}
div.regex input.danger { box-shadow: 0 0 0 1px #ffffff, 0 0 0 3px rgb(253 104 155), inset 0 1px 1px rgb(16 22 26 / 0%) !important; }
div.regex input:hover { box-shadow: 0 0 0 1px #ffffff, 0 0 0 3px rgb(55 109 217 / 21%), inset 0 1px 1px rgb(16 22 26 / 0%); }
div.regex span.success {
  color: #00ad36;
  background-color: #cef3cf;
  padding: 3px 4px;
  border-radius: 2px;
  margin-left: 10px;
}
div.regex span.danger {
  color: #cb0649;
  background-color: #fbdcdc;
  padding: 3px 4px;
  border-radius: 2px;
  margin-left: 10px;
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
          type: 'text', value: '', placeholder: 'E.g: 请输入字符串验证', 'data-code': code || '',
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

const options = {
  'github-corners': 'https://github.com/jaywcjlove/regexp-example.git',
  document: {
    style, script,
    link: [
      // { rel: 'shortcut icon', href: './favicon.ico' },
    ]
  },
  rewrite: (node, index, parent) => {
    if (node.tagName === 'pre' && node.properties.className) {
      const lang = Array.isArray(node.properties.className) ? node.properties.className.join('') : node.properties.className;
      if (/-regex$/.test(lang)) {
        const regCode = node.children[0];
        const regStr = getRegCode(regCode.children);
        console.log('parent:', parent)
        console.log('node:', node)
        console.log('index:', parent[index-1])
        node.children = [ ...node.children, input(regStr) ];
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