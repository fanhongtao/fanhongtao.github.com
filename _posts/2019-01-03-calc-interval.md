---
layout: post
title: 和弦音程计算器
categories: 工具
tags: [工具]
copyright: cn
---

在学习和弦时，会需要计算各音之间的音程，所以写了此页面，方便快速计算。

<!--more-->

<script type="text/javascript" src="{{ site.baseurl }}{% link /js/calc-interval.js %}"></script>

|根音到3音 | <select id="root"><option selected="selected">大3度</option><option>小3度</option></select> |
|3音到5音  | <select id="third"><option selected="selected">大3度</option><option>小3度</option></select> |
|5音到7音  | <select id="fifth"><option selected="selected">NA</option><option>大3度</option><option>小3度</option></select> |
|7音到9音  | <select id="seventh"><option selected="selected">NA</option><option>大3度</option><option>小3度</option></select> |
|9音到11音 | <select id="ninth"><option selected="selected">NA</option><option>大3度</option><option>小3度</option></select> |
|11音到13音| <select id="eleventh"><option selected="selected">NA</option><option>大3度</option><option>小3度</option></select> |
|<input id="calc" type="button" value="计算结果"/>  | <input id="result" type="text"/> |
