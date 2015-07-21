---
layout: post
title: Eclipse在线安装软件
description:  在线安装Eclipse插件
categories: software
tags: [eclipse]
copyright: cn
---

下面以安装 [Memory Analyzer (MAT)](http://www.eclipse.org/mat/) 为例进行说明：
 
从 MAT 的[下载页面](http://www.eclipse.org/mat/downloads.php)找到最新版本的地址。 当前最新版本为1.1.1，对应的地址是：[http://download.eclipse.org/mat/1.1/update-site/](http://download.eclipse.org/mat/1.1/update-site/)
 
在Eclipse中，通过菜单“Help”--> “Install New Software...”，

<a href="http://imgur.com/WyjJS"><img src="http://i.imgur.com/WyjJS.png" title="Hosted by imgur.com" alt="" /></a>

图1 Install界面
 
在Install界面点击“Add”按钮，

<a href="http://imgur.com/KTQDr"><img src="http://i.imgur.com/KTQDr.png" title="Hosted by imgur.com" alt="" /></a>

 图2 输入软件地址信息
 
* 在“Name”文本框输入软件的名字“MAT”
* 在“Location”文本框输入软件的地址“http://download.eclipse.org/mat/1.1/update-site/”

点击“OK”，返回到Install界面，此时刚才输入的地址已经在“Work with”中，同时下方已经将该站点可供安装的软件罗列出来。

<a href="http://imgur.com/GufkI"><img src="http://i.imgur.com/GufkI.png" title="Hosted by imgur.com" alt="" /></a>

图3 选择Eclipse插件安装

由于我们只需要安装Eclipse的插件，所以只用勾选“Memory Analyzer for Eclipse IDE”。

然后点击Next，Eclipse便开始下载并安装相应的插件。