---
layout: post
title: 在MathJax中添加自定义符号
description: 添加“矩形”、“平行四边形” 和 “平行且等于”符号
categories: Latex
tags: [latex, mathjax]
copyright: cn
---

* content
{:toc}


# 1. 思路

同 LaTex一样，MathJax中也没有矩形、平行四边形等符号，需要自己定义。

在 LaTex 中，我是通过 tikz 来绘制符号；同样的，也想在 MathJax 中通过某种方式来绘制。

# 2. 尝试

## 2.1 初步了解

因为要对 MathJax 进行扩展，所以先在文档中找到 [Tutorial: Extension writing][extension]。

* 先按照其内容下载 MathJax 代码。
* 在 `/MathJax/unpacked/` 目录下，创建一个 `mytest`子目录，用于存放测试用例。
* 根据该页面内容，录入相应的测试用例，测试完成后，对扩展有了个大概的了解。

## 2.2 第三方库

再根据页面中的链接，找到 [MathJax-third-party-extensions][third-party]，下载 git 库。

浏览了一下库中所提供的例子，发现 img 能够加载图片，或许可以被用上。

## 2.3 绘图？

我的本意是通过 MathJax 绘制图片，但 MathJax 自身并没有提供这样的功能，而是建议使用第三方JavaScript库进行绘制。
这首先带来选择难度（用那个好？），其次增加学习成本，所以放弃这个思路。

## 2.4 测试 img.js

将目光回到 img 上。它支持设定图片的 URL 地址、图片的长、宽和Y方向的偏移。

测试时，先将 unpacked 版本的 `img.js` 放置到 `/MathJax/unpacked/extensions/TeX` 目录，

再将 `img.js` 最后一行修改成
{% highlight js %}
MathJax.Callback.Queue(
  ["loadComplete",MathJax.Ajax,"[MathJax]/extensions/TeX/img.js"]
);
{% endhighlight %}

最后在 `mytest` 目录下写一个调用它的 html 文件： img_test.html。
{% highlight html %}
<html>
<head>
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    extensions: ["tex2jax.js"],
    tex2jax: { inlineMath: [['$','$'], ['\\(','\\)']]}
  });
  MathJax.Hub.Config({ 
    TeX: {
      extensions: ["img.js"],
    }
  });
</script>
<script type="text/javascript" src="../MathJax.js?config=TeX-MML-AM_HTMLorMML"></script>
</head>
<body>
$S\img [width=20px,height=20px]{me.jpg} $, 
$S\img [valign=-30px,width=20px,height=20px]{me.jpg} $,
</body>
</html>
{% endhighlight %}

## 2.5 分析 img.js

分析 `img.js` 的代码，发现它将 '\img' 转换成 MathJax 的 `mglyph` 对象。

再进一步分析，发现 MathJax 底层将公式都转换成 MathML 的标签。

查找 W3上关于[MathML mglyph标签](https://www.w3.org/TR/MathML3/chapter3.html#presm.mglyph)的介绍，发现它基本只有这几个属性（只多了一个 alt）。所以 `img.js` 应该没有太多扩展空间。

## 2.6 调优

### 2.6.1 绘制图片

如果通过 `img.js` 加载图片，就需要自己先绘制好图片。

考虑大多数浏览器都已经支持 SVG格式，所以我采用 SVG 来绘制。

先绘制一个100*50的矩形 (点击查看效果：[rectangle.svg](/attachments/rectangle.old.svg))：

```
<svg version="1.1" xmlns="http://www.w3.org/2000/svg">

<rect width="100" height="50"
style="fill:transparent;stroke-width:1;stroke:rgb(0,0,0)"/>
</svg>
```

### 2.6.2 加载图片

通过以下代码加载图片：
```
$$S\img {rectangle.svg} $$

$$S\img [width=30px,height=30px]{rectangle.svg} $$
```
结果: 第一次可以显示完整的矩形，而第二次只显示了矩形的左上角。这是因为我们的 svg 不支持自适应缩放。

### 2.6.3 修改图片

根据 [SVG多分辨率、自适应缩放解决方案](https://blog.csdn.net/kungstriving4/article/details/25186553) 中的方案，修改图片为（[修改后的版本](/attachments/rectangle.svg)）：

```
<svg version="1.1" xmlns="http://www.w3.org/2000/svg"
preserveAspectRatio="xMinYMin meet" viewBox="0,0,100,50">
<rect width="100" height="50"
style="fill:transparent;stroke-width:8;stroke:rgb(0,0,0)"/>
</svg>
```

也就是为 svg 增加了属性
```
preserveAspectRatio="xMinYMin meet" viewBox="0,0,100,50"
```

注意：`stroke-width:8` 从1修改成8，是因为在后面的测试中，发现绘制的矩形边框颜色太浅，和自有三角形的边明显不符。

### 2.6.4 融入表达式

加载的图片会被应用在表达式中，所以还需要它能够根据在表达式的位置，自己调整大小。

为了实现这一目标，需要使用 'mu' 这一单位。MathJax 会根据在表达式中的位置，调整它的实际大小。

下面是测试代码：

```
$S\img [width=16mu]{rectangle.svg}$,
$S_\img [width=16mu]{rectangle.svg}$,
$S^\img [width=16mu]{rectangle.svg}$ and
$S^{a_\img [width=16mu]{rectangle.svg}}$
```

### 2.6.5 定义宏

每次都写“\img [width=16mu]{rectangle.svg}”这样的代码，定义很麻烦，还容易出错。

所以通过自定义宏来简化代码。定义宏

```
MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
  MathJax.InputJax.TeX.Definitions.Add({
    macros: {
      symbol: ["Macro", "\\img [width=16mu] {#1}", 1],
      jx: ["Macro", "\\symbol { rectangle.svg }"], // 矩形
    }
  });
});
```

使用代码：

```
$S\jx$,
$S_\jx$,
$S^\jx$ and
$S^{a_\jx}$
```

# 3. 真实工程

在 Jekyll 工程中的真实用法，参考：<https://github.com/fanhongtao/math>

效果参见：<https://fanhongtao.github.io/math/shu-xue-fu-hao.html> ，在其中搜索“自定义符号”。

# 参考

* [Tutorial: Extension writing][extension]
* [MathJax-third-party-extensions][third-party]
* [Third-party Extensions](http://docs.mathjax.org/en/latest/options/ThirdParty.html)
* [Defining TeX macros][macros]
* [SVG 教程](http://www.w3school.com.cn/svg/index.asp)

[extension]: http://docs.mathjax.org/en/latest/advanced/extension-writing.html
[third-party]: https://github.com/mathjax/MathJax-third-party-extensions
[macros]: http://docs.mathjax.org/en/latest/tex.html#defining-tex-macros

