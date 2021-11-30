RegExp Example
===

正则表达式实例搜集，通过实例来学习正则表达式。本仓库实例搜集整理来自于[**《一些正则表达式随记》**](https://github.com/jaywcjlove/handbook/blob/master/Javascript/%E4%B8%80%E4%BA%9B%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E9%9A%8F%E8%AE%B0.md)，通过一个单独仓库专门整理这些正则实例，提供一个[**实例网站**](https://jaywcjlove.github.io/regexp-example)，方便正则实例验证和查询。也方便[**添加**](https://github.com/jaywcjlove/regexp-example/issues/new?labels=new&assignees=jaywcjlove&title=%E6%B7%BB%E5%8A%A0%E6%96%B0%E5%AE%9E%E4%BE%8B%EF%BC%9A)新的正则实例大家共同维护。

[表达式全集](#表达式全集) · [Example](#example) · [工具推荐](#工具推荐) · [国内镜像站点🇨🇳](https://jaywcjlove.gitee.io/regexp-example) · [Gitee](https://gitee.com/jaywcjlove/regexp-example) · [License](#license)

<!--regulex-->

如果有一些基础知识，通过实例理解，将会更快速入门，写出自己的正则。如果对基础还不是很了解，你可以通过[**《Learn regex the easy way》**](https://github.com/ziishaned/learn-regex)去学习基础知识，这个仓库教程被翻译成十几种语言了，包含了[中文翻译](https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md)，它通过极其简单的实例，帮助你理解正则基础语法规则。

## 表达式全集

<details>
<summary>元字符</summary>

正则表达式主要依赖于元字符。
元字符不代表他们本身的字面意思，他们都有特殊的含义。一些元字符写在方括号中的时候有一些特殊的意思。以下是一些元字符的介绍：

字符 | 描述 
---- | ----
. | 句号匹配任意单个字符除了换行符。要匹配包括 `\n` 在内的任何字符，请使用像 `(.\|\n)` 的模式。
[ ] | 字符种类。匹配方括号内的任意字符。
[^ ] | 否定的字符种类。匹配除了方括号里的任意字符
\* | 匹配 >=0 个重复的在 `*` 号之前的字符。例如，`zo*` 能匹配 `z` 以及 `zoo` 。`*` 等价于 `{0,}`。
\+ | 匹配 >=1 个重复的 `+` 号前的字符。例如， `zo+` 能匹配 `zo` 以及 `zoo` ，但不能匹配 `z` 。`+` 等价于 `{1,}`。
? | 标记 ? 之前的字符为可选。例如，`do(es)?` 可以匹配 `does` 或 `does` 中的 `do`。`?` 等价于 `{0,1}`。
&#124; | 或运算符，匹配符号前或后的字符。例如，`z|food` 能匹配 `z` 或 `food`。`(z|f)ood` 则匹配 `zood` 或 `food`。
&#92; | 转义字符,用于匹配一些保留的字符 `[ ] ( ) { } . * + ? ^ $ \ &#124;`
^ | 从开始行开始匹配。
&#36; | 从末端开始匹配。
{n} | `n` 是一个非负整数。匹配确定的n次。例如， `o{2}` 不能匹配 `Bob` 中的 `o` ，但是能匹配 `food` 中的两个 `o`。
{n,} | `n` 是一个非负整数。至少匹配n次。例如， `o{2,}`不能匹配 `Bob`中的 `o`，但能匹配 `foooood`中的所有o。 `o{1,}`等价于 `o+`。 `o{0,}`则等价于 `o*`。
{n,m} | `m` 和 `n` 均为非负整数，其中 `n<=m`。最少匹配 `n` 次且最多匹配 `m` 次。例如，`o{1,3}` 将匹配 `fooooood` 中的前三个 `o`。`o{0,1}` 等价于 `o?`。请注意在逗号和两个数之间不能有空格。
(xyz) | 字符集，匹配与 `xyz` 完全相等的字符串.
[xyz] | 字符集合。匹配所包含的任意一个字符。例如，`[abc]` 可以匹配 `plain` 中的 `a`。
[^xyz] | 负值字符集合。匹配未包含的任意字符。例如， `[^abc]` 可以匹配 `plain` 中的 `p`。
[a-z] | 字符范围。匹配指定范围内的任意字符。例如，`[a-z]` 可以匹配 `a` 到 `z` 范围内的任意小写字母字符。
[^a-z] | 负值字符范围。匹配任何不在指定范围内的任意字符。例如，`[^a-z]` 可以匹配任何不在 `a` 到 `z` 范围内的任意字符。

</details>

<details>
<summary>字符集简写</summary>

正则表达式提供一些常用的字符集简写。如下:

简写 | 描述
---- | ----
. | 除换行符外的所有字符
\w | 匹配所有字母数字，等同于 `[a-zA-Z0-9_]`
\W | 匹配所有非字母数字，即符号，等同于： `[^\w]`
\d | 匹配数字： `[0-9]`
\D | 匹配非数字： `[^\d]`
\s | 匹配所有空格字符，等同于： `[\t\n\f\r\p{Z}]`
\S | 匹配所有非空格字符： `[^\s]`
\f | 匹配一个换页符
\n | 匹配一个换行符
\r | 匹配一个回车符
\t | 匹配一个制表符
\v | 匹配一个垂直制表符
\p | 匹配 CR/LF（等同于 `\r\n`），用来匹配 DOS 行终止符
\b | 匹配一个单词边界，指单词和空格间的位置。例如，`er\b` 可以匹配 `never` 中的 `er`，但不能匹配 `verb` 中的 `er`。
\B | 匹配非单词边界。`er\B` 能匹配 `verb` 中的 `er`，但不能匹配 `never` 中的 `er`。

</details>

<details>
<summary>零宽度断言</summary>

符号 | 描述
---- | ----
?= | 正先行断言-存在
?! | 负先行断言-排除
?<= | 正后发断言-存在
?<! | 负后发断言-排除

</details>

<details>
<summary>标志 - 模式修正符</summary>

标志也叫模式修正符，因为它可以用来修改表达式的搜索结果。
这些标志可以任意的组合使用，它也是整个正则表达式的一部分。

标志 | 描述
---- | ----
i | 忽略大小写。
g | 全局搜索。
m | 多行修饰符：锚点元字符 `^` `$` 工作范围在每行的起始。

</details>

## Example

### 身份证号

```regex
^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$
```

🚧  E.g: `42112319870115371X`

### 军官证

```regex
^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$
```

🚧  E.g: `军字第2001988号`，`士字第P011816X号`。 军/兵/士/文/职/广/（其他中文） + "字第" + 4到8位字母或数字 + "号"

### 护照

```regex
^([a-zA-z]|[0-9]){5,17}$
```

🚧  E.g: `141234567`，`G12345678`，`P1234567`。14/15开头 + 7位数字, G + 8位数字, P + 7位数字, S/D + 7或8位数字,等

### 港澳居民来往内地通行证

```regex
^([A-Z]\d{6,10}(\(\w{1}\))?)$
```

🚧  E.g: `H1234567890`。H/M + 10位或6位数字

### 台湾居民来往大陆通行证

```regex
^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$
```

🚧  E.g: `12345678`，`1234567890B`。新版8位或18位数字， 旧版10位数字 + 英文字母

### 用户名


```regex
^[a-zA-Z0-9_-]{4,16}$
```

🚧  E.g: `jaywcjlove`。验证 **数字**、**字母**、**_**、**-**，不包含特殊字符，长度 `4-16` 之间。

### 微信号

```regex
^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$
```

🚧  E.g: `jslite`。微信号正则，6至20位，以字母开头，字母，数字，减号，下划线。

### 密码强度(宽松)

```regex
^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$
```

🚧  E.g: `diaoD123`, `Wgood123`。必须是包含大小写**字母**和**数字**的组合，长度在 `8-10` 之间。

```regex
^[0-9a-zA-Z\u4E00-\uFA29]*$
```

🚧  E.g: `diaoD123`, `Wgood123`。数字字母中文。

### 密码强度(包含特殊字符)

```regex
^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$
```

🚧  E.g: `diaoD123#`, `Wgood123#$`。密码强度正则，最少`6`位，包括至少`1`个**大写字母**，`1`个**小写字母**，`1`个**数字**，`1`个**特殊字符**。

### 火车车次

```regex
^[GCDZTSPKXLY1-9]\d{1,4}$
```

E.g: `G2868`, `D22`, `D9`, `Z5`, `Z24`, `Z17`

### 汉字中文

```regex
^[\u4e00-\u9fa5]{0,}$
```

🚧  E.g: `中文`, `湖北`, `黄冈`。不限制文字长度。


```regex
^[\u4e00-\u9fa5]{2,6}$
```

🚧  E.g: `中文`, `湖北黄冈`。2到6位汉字

### 中文名字

```regex
^(?:[\u4e00-\u9fa5·]{2,16})$
```

🚧  E.g: `周杰伦`, `古丽娜扎尔·拜合提亚尔`, `拉希德·本·穆罕默德·本·拉希德`。

### 英文姓名

```regex
(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)
```

🚧  E.g: `Gene Kelly`, `Fred Astaire`, `Humphrey Bogart`, `GaryCooper`, `Cary Grant`, `Joan Crawford`

### URL

```regex
^[a-zA-Z]+:\/\/
```

🚧  E.g: `http://www.abc.com`, `http://`, `https://`

```regex
^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$
```

🚧  E.g: `https://github.com`, `https://github.com/jaywcjlove`

```regex
^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$
```

🚧  E.g: `blog.csdn.net`

### Mac地址匹配

```regex
^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$
```

🚧  E.g: `dc:a9:04:77:37:20`

### 图片后缀

```regex
(.jpg|.gif|.png|.jpeg)+(\?|\#|$)
```

🚧  E.g: `a/b/c.jpg?`, `a/b/c.png`, `a/b/c.png?good=1`

### 传真号码

```regex
^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$
```

🚧  E.g: `086-021-5055452`, `021-5055452`。国家代码(2到3位)，区号(2到3位)，电话号码(7到8位)，分机号(3位)

### 手机号码

```regex
^1[34578]\d{9}$
```

🚧  E.g: `13611778887`

```regex
^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[57]|15[012356789]|17[03678]|18[0-9])\d{8}$
```

🚧  E.g: `13611779993`, `+8613611779993`

<details>
<summary>正则规则详细说明</summary>

* 13段：130、131、132、133、134、135、136、137、138、139
* 14段：145、147
* 15段：150、151、152、153、155、156、157、158、159
* 17段：170、176、177、178
* 18段：180、181、182、183、184、185、186、187、188、189
* 国际码 如：中国(+86)

</details>

### IPv4 地址

```regex
(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}
```

🚧  E.g: `192.168.1.1`, `127.0.0.1`, `0.0.0.0`, `255.255.255.255`, `1.2.3.4`

```regex
^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$
```

🚧  E.g: `192.168.1.1`, `127.0.0.1`, `0.0.0.0`, `255.255.255.255`, `1.2.3.4`

### IPv6

```regex
(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))
```

🚧  E.g: `2001:0db8:85a3:0000:0000:8a2e:0370:7334`, `FE80:0000:0000:0000:0202:B3FF:FE1E:8329`。

### Email

```regex
^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$
```

🚧  E.g: `wowohoo@qq.com`

```regex
^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$
```

🚧  E.g: `wowohoo@qq.com`

<details>
<summary>正则规则详细说明</summary>

1. 邮箱以a-z、A-Z、0-9开头，最小长度为1.
2. 如果左侧部分包含-、_、.则这些特殊符号的前面必须包一位数字或字母。
3. @符号是必填项
4. 右则部分可分为两部分，第一部分为邮件提供商域名地址，第二部分为域名后缀，现已知的最短为2位。
   最长的为6为。
5. 邮件提供商域可以包含特殊字符-、_、.

</details>


### 十六进制颜色

```regex
^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$
```

🚧  E.g: `#b8b8b8`, `#333`

```regex
^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$
```

🚧  E.g: `#b8b8b8`, `#333`

### 日期

```regex
^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$
```

🚧  E.g: `2017-02-29`。对**月份**及**日期**验证。

### 版本号

```regex
^\d+(?:\.\d+){2}$
```

🚧  E.g: `0.1.2`。格式必须为 `X.Y.Z`。

### 车牌号

```regex
^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](?:((\d{5}[A-HJK])|([A-HJK][A-HJ-NP-Z0-9][0-9]{4}))|[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳])$
```

🚧  E.g: `鄂A34324`, `沪E13359F`。包含**新能源**车牌。

```regex
^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]$
```

🚧  E.g: `鄂A34324`, `沪E13595`。不包含**新能源**车牌。

### 小数点后几位

```regex
^(0|[1-9]\d*)(.[0-9]{2})$
```

🚧  E.g: `1.22`, ~~`0223.23`~~, `0.00`。精确到 `2` 位小数

### 小数

```regex
^\d+\.\d+$
```

🚧  E.g: `0.0`, `0.23`, `10.54`。

```regex
(-?\d+)(\.\d+)?
```

🚧  E.g: `-0.0`, `0.23`, `-10.54`。

### 正整数

```regex
[0-9]*[1-9][0-9]*
```

🚧  E.g: `23`

### 负整数

```regex
-[0-9]*[1-9][0-9]*
```

🚧  E.g: `-23`, `-2.34`

### 整数

```regex
-?\d+
```

🚧  E.g: `23`, `12`, `-12.55`

### 非负整数(正整数或零)

```regex
\d+
```

🚧  E.g: `23`, `3.322`

### 数字

```regex
^\d{1,}$
```

🚧  E.g: `0120`，`234234`。不包含小数。

```regex
^\d{32}$
```

🚧  E.g: `12232324444757575757575757575759`。**32**位纯数字。

### 数字(QQ号码)

```regex
^[1-9][0-9]{4,10}$
```

🚧  E.g: `398188661`。QQ号正则，5至11位。

```regex
^\d{5,11}$
```

🚧  E.g: `398188661`。更简单的 QQ 号码正则，5~11位数字组成。


### 中国邮政编码

```regex
[1-9]\d{5}(?!\d)
```

🚧  E.g: `200000`。中国邮政编码为 6 位数字。

### 英文字母

```regex
^[A-Z]+$
```

🚧  E.g: `ABC`，`WANG`。大写英文字母。

```regex
^[a-z]+$
```

🚧  E.g: `abc`，`wang`。小写英文字母。

```regex
(^[a-z]|[A-Z0-9])[a-z]*
```

🚧  E.g: `Tests`，`JavaScript`，`RegEx`。大驼峰。

### 端口号

```regex
^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$
```

🚧  E.g: `8080`，`3000`，`65535`

### 迅雷链接

```regex
^thunderx?:\/\/[a-zA-Z\d]+=$
```

🚧  E.g: `thunder://QUFodHRwOi0vdG0vbC5sdS90ZXN0LnppcFpa`。


### ed2k链接

```regex
^ed2k:\/\/\|file\|.+\|\/$
```

🚧  E.g: `ed2k://|file|[xxx.com][%E8%8B%B1%E9%9B%84%E6%9C%AC%E8%89%B23.mp4|/`。

### 磁力链接

```regex
^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$
```

🚧  E.g: `magnet:?xt=urn:btih:608FA22181A2614BAE9160763F04FCB7ED296B9E`

### 时间

```regex
^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$
```

🚧  E.g: `21:54:55`，`00:23:23`。`24` 小时制时间格式 `HH:mm:ss`，并且验证时间。

```regex
^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$
```

🚧  E.g: `12:54:55`，`01:23:23`。`12` 小时制时间格式 `HH:mm:ss`，并且验证时间。

### HTML标记

```regex
<(\S*?)[^>]*>.*?</\1>|<.*?/>
```

🚧  E.g: `<div>title</div>`, `<head>title</head>`。

## 工具推荐

- [RegExp](http://github.com/gskinner/regexr) 线上正则表达式学习利器。
- [Regulex](https://jex.im/regulex/#!flags=&re=%5E(a%7Cb)*%3F%24) JavaScript 正则表达式可视化工具。 [🇨🇳](https://jaywcjlove.gitee.io/regulex/)
- [Rubular](https://rubular.com/) Ruby 正则表达式编辑器。
- [Regex101](https://regex101.com/) 多语言支持、构建、调试并共享正则。
- [Regexper](https://regexper.com/) 正则表达式可视化工具。
- [RegEx Pal](https://www.regexpal.com/) 正则表达式调试及练习示例。
- [Regular Expression Tester](http://myregexp.com/) 在线正则表达式测试仪。
- [iHateRegex](https://github.com/geongeorge/i-hate-regex) 正则表达式备忘清单。
- [以简单的方式学习正则表达式](https://github.com/ziishaned/learn-regex)
- [Expressions APP](https://www.apptorium.com/expressions) 正则表达式应用 for Mac

## License

Licensed under the MIT License.
