RegExp Example
===

正则表达式实例搜集，通过实例来学习正则表达式。本仓库实例搜集整理来自于[**《一些正则表达式随记》**](https://github.com/jaywcjlove/handbook/blob/master/Javascript/%E4%B8%80%E4%BA%9B%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E9%9A%8F%E8%AE%B0.md)，通过一个单独仓库专门整理这些正则实例，提供一个[实例网站](https://jaywcjlove.github.io/regexp-example)，方便正则实例验证和查询。也方便[**添加**](https://github.com/jaywcjlove/regexp-example/issues/new?labels=new&assignees=jaywcjlove&title=%E6%B7%BB%E5%8A%A0%E6%96%B0%E5%AE%9E%E4%BE%8B%EF%BC%9A)新的正则实例大家共同维护。

## Example

### 身份证号

```regex
^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$
```

🚧  E.g: `42112319870115371X`

### 用户名

验证 **数字**、**字母**、**_**、**-**，不包含特殊字符，长度 `4-16` 之间。

```regex
^[a-zA-Z0-9_-]{4,16}$
```

### QQ号码

```regex
^[1-9][0-9]{4,10}$
```

🚧  E.g: `398188661`。QQ号正则，5至11位。

### 微信号

```regex
^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$
```

🚧  E.g: `jslite`。微信号正则，6至20位，以字母开头，字母，数字，减号，下划线。

### 密码强度(宽松)

必须是包含大小写**字母**和**数字**的组合，长度在 `8-10` 之间。

```regex
^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$
```

### 密码强度(包含特殊字符)

密码强度正则，最少`6`位，包括至少`1`个**大写字母**，`1`个**小写字母**，`1`个**数字**，`1`个**特殊字符**。

```regex
^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$
```

🚧  E.g: `diaoD123#`, `Wgood123#$`

### 火车车次

```regex
^[GCDZTSPKXLY1-9]\d{1,4}$
```

E.g: `G2868`, `D22`, `D9`, `Z5`, `Z24`, `Z17`

### 校验中文

```regex
^[\u4e00-\u9fa5]{0,}$
```

🚧  E.g: `中文`, `湖北`, `黄冈`

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

> * 13段：130、131、132、133、134、135、136、137、138、139
> * 14段：145、147
> * 15段：150、151、152、153、155、156、157、158、159
> * 17段：170、176、177、178
> * 18段：180、181、182、183、184、185、186、187、188、189
> * 国际码 如：中国(+86)

### IPv4 地址

```regex
^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$
```

🚧  E.g: `192.168.130.199`

### Email

```regex
^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$
```

🚧  E.g: `wowohoo@qq.com`

```regex
^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$
```

🚧  E.g: `wowohoo@qq.com`

> 1. 邮箱以a-z、A-Z、0-9开头，最小长度为1.
> 2. 如果左侧部分包含-、_、.则这些特殊符号的前面必须包一位数字或字母。
> 3. @符号是必填项
> 4. 右则部分可分为两部分，第一部分为邮件提供商域名地址，第二部分为域名后缀，现已知的最短为2位。
>    最长的为6为。
> 5. 邮件提供商域可以包含特殊字符-、_、.

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

### 小数点后几位

```regex
^[0-9]+(.[0-9]{2})?$
```

🚧  E.g: `1.22`, `0223.23`。精确到 `2` 位小数

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

### 小数

```regex
^\d+\.\d+$
```

🚧  E.g: `0.0`, `0.23`, `10.54`。