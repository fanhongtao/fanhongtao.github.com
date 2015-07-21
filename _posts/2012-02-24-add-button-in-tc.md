---
layout: post
title: Total Commander中添加工具栏按钮
categories: software
tags: [tool]
copyright: cn
---

下面以将Beyond Comare 加入到TC的自定义按钮为例进行说明。
 
第一步：在TC中，打开Beyond Compare所在的目录

第二步：选择BC的执行文件（BCompare.exe），将其拖到TC的工具栏上。

<a href="http://imgur.com/Bvurp"><img src="http://i.imgur.com/Bvurp.png" title="Hosted by imgur.com" alt="" /></a>

图1 拖动可执行文件到工具栏
 
 
第三步：把鼠标放在在工具栏新生成的图标上，通过鼠标右键菜单，选择“更改(C)...”，进行更改界面
 
 
第四步：在“参数(P)”文本框中输入：  ""%P"  "%T""，然后点击“确定”。

<a href="http://imgur.com/TDGSM"><img src="http://i.imgur.com/TDGSM.png" alt="" title="Hosted by imgur.com" /></a>

图2 配置参数

注意：TC会自动删除最前面和最后面的双引号，所以在输入的参数中，最前面和最后面都是两个双引号。
 
 
 
点击工具栏上的BC按钮，就可以打开BC界面，并且将当前的源目录和目的目录作为两个需要比较的目录。