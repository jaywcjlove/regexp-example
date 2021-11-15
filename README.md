RegExp Example
===

正则表达式实例搜集，通过实例来学习正则表达式。本仓库实例搜集整理来自于[**《一些正则表达式随记》**](https://github.com/jaywcjlove/handbook/blob/master/Javascript/%E4%B8%80%E4%BA%9B%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E9%9A%8F%E8%AE%B0.md)，通过一个单独仓库专门整理这些正则实例，提供一个网站，方便正则实例验证和查询。也方便你[**添加**](https://github.com/jaywcjlove/regexp-example/issues/new?labels=new&assignees=jaywcjlove&title=%E6%B7%BB%E5%8A%A0%E6%96%B0%E5%AE%9E%E4%BE%8B%EF%BC%9A)新的正则实例。

### 用户名

验证 **数字**、**字母**、**_**、**-**，不包含特殊字符，长度 `4-16` 之间。

```regex
^[a-zA-Z0-9_-]{4,16}$
```

### 密码强度

必须是包含大小写**字母**和**数字**的组合，不能使用**特殊字符**，长度在 `8-10` 之间。

```regex
^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$
```

### 火车车次

```regex
^[GCDZTSPKXLY1-9]\d{1,4}$
```

E.g: `G2868`, `D22`, `D9`, `Z5`, `Z24`, `Z17`

### 校验中文

```regex
^[\u4e00-\u9fa5]{0,}$
```

E.g: `中文`, `湖北`, `黄冈`