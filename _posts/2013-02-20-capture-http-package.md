---
layout: post
title: HTTP抓包
categories: software
tags: [tool]
copyright: cn
---

* content
{:toc}

开发基于HTTP的应用（如：网页或XML消息）时，为了确保服务器与客户端的消息与接口协议一致，最直接的办法就是对消息进行抓包。

下面介绍几款常用的抓包或辅助分析工具。

# 推荐软件

## 1 Wireshark

最先想到的当然是万能的 [Wireshark](http://www.wireshark.org/download.html)。 与第三方对接时首选工具，将码流保存成 cap 格式，谁对谁错，一目了然。

这个大家都知道，就不多说了。

## 2 Fiddler

[Fiddler](http://www.fiddler2.com) 是一个基于 .Net 开发的工具，虽然不能保存成 cap 格式，不方便事后分析。但有以下好处：

1. 通过 "http://localhost./" 的方式（即：在localhost后面添加一个点）来显示本地收发的消息（ 我不知道在Wireshark中应该如何处理）
2. 针对消息体中的JSON、XML、图片单独显示，方便查看收发的内容

所以，如果是自己开发程序（或开发人员坐在一起时），优先本工具。

参考: [Fiddler 教程](http://www.cnblogs.com/TankXiao/archive/2012/02/06/2337728.html)

# 其它软件

## 3 SmartSniffer

[SmartSniffer](http://www.nirsoft.net/utils/smsniff.html) 是绿色软件，解压即用。

能够在抓包的同时显示数据，但不能保存成 cap 格式。

## 4 TcpTrace

严格来讲，[TcpTrace](http://www.pocketsoap.com/tcptrace/)不算一个抓包工具。而是通过TCP转发方式来显示收发的消息。

只支持文本方式显示，不能显示具体的码流。
