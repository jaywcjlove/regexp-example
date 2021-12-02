import FS from 'fs-extra';
import path from 'path';
import { create } from 'markdown-to-html-cli';

const deployDir = path.resolve(process.cwd(), 'web');
const mdPath = path.resolve(process.cwd(), 'README.md');
const htmlPath = path.resolve(process.cwd(), 'web', 'index.html');
const style = FS.readFileSync(path.resolve(process.cwd(), 'scripts/style.css')).toString();
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

const options = {
  'github-corners': 'https://github.com/jaywcjlove/regexp-example.git',
  document: {
    style, script,
    link: [
      // { rel: 'shortcut icon', href: './favicon.ico' },
    ]
  },
  rewrite: (node) => {
    if (node.type === 'comment' && node.value === 'regulex') {
      node.type = 'element';
      node.tagName = 'iframe';
      node.properties = {
        src: 'regulex/index.html',
        visible: 0,
      }
    }
    if (node.type === 'element' && node.tagName === 'body') {
      node.properties = { ...node.properties, id: 'totop' };
      node.children = [...createLink(), ...node.children];
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