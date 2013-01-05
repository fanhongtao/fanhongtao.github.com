---
layout: post
title: 表格的威力
description:  利用一个Excel表格辅助思维
categories: skill
tags: [skill]
copyright: cn
---

最近编写的程序中，遇到一个开关和另外一个可变参数组合的问题。

刚开始由于没有思考清楚，走了弯路，后来借助如下表格，才整理清楚。


<table width="100%">
    <thead>
        <tr>
            <th width="10%">序号</th>
			<th width="20%">开关（原始值）</th>
			<th width="20%">开关（最新值）</th>
			<th width="20%">参数是否变化</th>
            <th width="50%">对应的动作</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>1</td><td>关</td><td>关</td><td>否</td><td>处理逻辑1</td></tr>
        <tr><td>2</td><td>关</td><td>关</td><td>是</td><td>处理逻辑2</td></tr>
        <tr><td>3</td><td>关</td><td>开</td><td>否</td><td>处理逻辑3</td></tr>
        <tr><td>4</td><td>关</td><td>开</td><td>是</td><td>处理逻辑4</td></tr>
        <tr><td>5</td><td>开</td><td>关</td><td>否</td><td>处理逻辑5</td></tr>
        <tr><td>6</td><td>开</td><td>关</td><td>是</td><td>处理逻辑6</td></tr>
        <tr><td>7</td><td>开</td><td>开</td><td>否</td><td>处理逻辑7</td></tr>
        <tr><td>8</td><td>开</td><td>开</td><td>是</td><td>处理逻辑8</td></tr>
    </tbody>
</table>

思维方式：

* 先列出可能组合及每种组合下应该的处理
* 再分析各种组合能否代码复用
