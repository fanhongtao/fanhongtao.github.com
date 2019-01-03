---
layout: post_music
title: 和弦音程计算器
categories: 工具
tags: [工具]
copyright: cn
---

在学习和弦时，会需要计算各音之间的音程，所以写了此页面，方便快速计算。

<!--more-->

<script type="text/javascript" src="{{ site.baseurl }}{% link /js/calc-interval.js %}"></script>

在表格中选择各个三度音的组成，然后点击表格最后一行的 `计算音程` 按钮。

|&&和弦音程计算器&&序号|三度音|与根音的音程|
|---|
|1| <select id="triad_1"><option selected="selected">大3度</option><option>小3度</option></select> |
|2| <select id="triad_2"><option selected="selected">大3度</option><option>小3度</option></select> | <input id="interval_2" type="text" readonly/> |
|3| <select id="triad_3"><option selected="selected">NA</option><option>大3度</option><option>小3度</option></select> | <input id="interval_3" type="text" readonly/> |
|4| <select id="triad_4"><option selected="selected">NA</option><option>大3度</option><option>小3度</option></select> | <input id="interval_4" type="text" readonly/> |
|5| <select id="triad_5"><option selected="selected">NA</option><option>大3度</option><option>小3度</option></select> | <input id="interval_5" type="text" readonly/> |
|6| <select id="triad_6"><option selected="selected">NA</option><option>大3度</option><option>小3度</option></select> | <input id="interval_6" type="text" readonly/> |
|||<input id="calc" type="button" value="计算音程"/> |
