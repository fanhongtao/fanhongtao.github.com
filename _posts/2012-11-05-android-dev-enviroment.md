---
layout: post
title: 搭建基于Eclipse的Android开发环境
description:  这里只涉及开发Android应用，不涉及底层开发。内容包括Eclipse安装，ADT、Source等插件安装
categories: programming
tags: [android, eclipse]
copyright: cn
---

* content
{:toc}

# 1 下载 Eclipse
从 http://www.eclipse.org/downloads/ 下载最新的Eclipse版本。

只需要下载标准版本的Eclipse （Eclipse Classic）就可以了。这里下载的是 eclipse-SDK-4.2.1-win32.zip 包

修改字体：

Perference -> General -> Appearance -> Colors and Fonts 

Structured Text Editor -> Structured Text Editor Text Font ， 修改成 "Courier New 10"
Java -> Java Editor Text Font ， 修改成 "Courier New 10"

对于 Win7 系统，默认不显示"Courier New"字体，所以需要在选择时先点击“显示更多字体”，在新弹出的窗口中找到并选中“Courier New”，然后点击窗口上方的“显示”按钮，这样才能选择该字体。

# 2 安装 Eclipse 插件

进入 Eclipse， 通过菜单“Help” -> “Install New Software...” 打开安装插件的界面。

点击“Add”按钮，
分别输入

* ADT Plugin
* https://dl-ssl.google.com/android/eclipse/2

See: http://developer.android.com/tools/sdk/eclipse-adt.html

另外，还可以安装以下两个插件：

* Android SDK Installer
* http://adt-addons.googlecode.com/svn/trunk/installer/com.android.ide.eclipse.installer.update/

* Android Sources
* http://adt-addons.googlecode.com/svn/trunk/source/com.android.ide.eclipse.source.update/

安装完"Android Sources"后，可以将某个Android版本的代码与Eclipse的 plugins/com.android.ide.eclipse.source_xxxxxx 目录下对应版本的源码包关联。这样就可以在Eclipse中查看到Android的代码。

See: https://code.google.com/p/adt-addons/


