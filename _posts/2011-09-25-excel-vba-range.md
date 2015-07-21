---
layout: post
title: Excel中获取指定区域的位置
categories: software
tags: [excel, vba]
copyright: cn
---

* content
{:toc}

# 获取指定区域的开始行
通过Row属性来获取
<pre>
Function StartRow(rng As Range) As Integer
    StartRow = rng.Row
End Function
</pre>

# 获取指定区域的结束行
先找到最后一行，再通过Row属性获取其对应的行数
<pre>
Function EndRow(rng As Range) As Integer
    EndRow = rng.Rows(rng.Rows.Count).Row
End Function
</pre>

# 获取指定区域的开始列
通过Column属性来获取
<pre>
Function StartColumn(rng As Range) As Integer
    StartColumn = rng.Column
End Function
</pre>

# 获取指定区域的结束列
先找到最后一列，再通过Column属性获取其对应的列数
<pre>
Function EndColumn(rng As Range) As Integer
    EndColumn = rng.Columns(rng.Columns.Count).Column
End Function
</pre>

