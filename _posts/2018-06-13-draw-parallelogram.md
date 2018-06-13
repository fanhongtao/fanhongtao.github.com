---
layout: post
title: 在Latex中，如何打出平行四边形符号？
description: 绘制“平行四边形” 和 “平行且等于”符号
categories: Latex
tags: [latex]
copyright: cn
---

在写关于几何的文章时，会需要绘制平行四边形。

```
\documentclass[UTF8]{article}
\usepackage{amsmath}
\usepackage{tikz}

% 定义符号：平行且等于
\newcommand\paralleleq{
	\mathrel{\text{
			\tikz[baseline,line width=0.1ex,line cap=round]
			\draw (0,0) -- (.7em,0)
			(0,.3ex) -- (.7em,.3ex)
			(.2em,.55ex) -- (.4em,1.8ex)
			(.35em,.55ex) -- (.55em,1.8ex);}}}

% 定义图形：平行四边形
\newcommand\parallelogram{
	\mathord{\text{
			\tikz[baseline]
			\draw (0,.1ex) -- (.8em,.1ex) -- (1em,1.6ex) -- (.2em,1.6ex) -- cycle;}}}

% 定义中文拼音缩写，方便使用
\let\pxsbx\parallelogram
\let\pxqdy\paralleleq

\begin{document}

The shape of $ \parallelogram ABCD$ is $ S_{\pxsbx ABCD} $.

Line AB $\pxqdy$ CD, and AC $\paralleleq$ BD.

\end{document}
```

代码来自：<http://bbs.chinatex.org/forum.php?mod=viewthread&tid=7179&extra=page=1>
