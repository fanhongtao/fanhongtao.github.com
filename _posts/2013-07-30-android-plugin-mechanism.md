---
layout: post
title: Android的插件机制
description:  Android下几种不同不同层次的插件介绍
categories: android
tags: [android, plugin]
copyright: cn
---

# 什么是插件

百度百科是这样定义[插件](http://baike.baidu.com/view/18979.htm)的：

插件的定位应该是开发实现原纯净系统平台/应用软件平台不具备的功能的程序，其只能运行在程序规定的系统平台下（可能同时支持多个平台），而不能脱离指定的平台单独运行。因为插件需要调用原纯净系统提供的函数库或者数据。

# 第0层插件 —— APK

根据百度百科的定义，我们可以认为Android系统本身就是一个巨大的插件系统。

而我们所开发的APK，就是针对Android系统的插件。


# 第1层插件 —— 资源/实现 替换

本层的代表是 [友盟实验室](http://www.umeng.com/home/lab)  放出的 APF(Android Plugin Framework)。

这种插件实现方式，主要适用于将程序逻辑与界面分离，以便通过插件替换现有的实现逻辑。

如 APF所举的例子： 对同一款游戏，提供两个不同的插件，一个实现“低难度”的算法，另一个实现 “高难度”的算法。

[代码下载地址](https://github.com/umeng/apf)

# 第2层插件 —— Activity 替换

本层的代表是 腾讯的手机游戏平台。

虽然 腾讯 没有对外发布源码，但我们可以通过以下文章对其有一个大致的了解。

[探秘腾讯Android手机游戏平台之不安装游戏APK直接启动法](http://blog.zhourunsheng.com/2011/09/%E6%8E%A2%E7%A7%98%E8%85%BE%E8%AE%AFandroid%E6%89%8B%E6%9C%BA%E6%B8%B8%E6%88%8F%E5%B9%B3%E5%8F%B0%E4%B9%8B%E4%B8%8D%E5%AE%89%E8%A3%85%E6%B8%B8%E6%88%8Fapk%E7%9B%B4%E6%8E%A5%E5%90%AF%E5%8A%A8%E6%B3%95/?utm_source=rss&utm_medium=rss&utm_campaign=%25e6%258e%25a2%25e7%25a7%2598%25e8%2585%25be%25e8%25ae%25afandroid%25e6%2589%258b%25e6%259c%25ba%25e6%25b8%25b8%25e6%2588%258f%25e5%25b9%25b3%25e5%258f%25b0%25e4%25b9%258b%25e4%25b8%258d%25e5%25ae%2589%25e8%25a3%2585%25e6%25b8%25b8%25e6%2588%258fapk%25e7%259b%25b4%25e6%258e%25a5%25e5%2590%25af%25e5%258a%25a8%25e6%25b3%2595)、


# 第3层插件 —— Fragment 替换

Fragment 是 Android 3.0 引入的。它同 Activity 一样，具有自己的生命周期，能够与用户交互。从理论上，我们可以只写一个Activity，然后将所有界面都通过不同的 Fragment 来实现。

本层的代表是 [mmin18](https://github.com/mmin18) 所放出的一个Demo。

[代码下载地址](https://github.com/mmin18/AndroidDynamicLoader)

