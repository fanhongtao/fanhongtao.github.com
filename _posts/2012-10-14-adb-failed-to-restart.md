---
layout: post
title: ADB无法正常启动
description:  记录解决ADB无法正常启动的过程
categories: android
tags: [android, adb]
copyright: cn
---

今天在Eclipse中运行Android工程，Eclipse提示

<pre>
The connection to adb is down, and a severe error has occured.
You must restart adb and Eclipse.
Please ensure that adb is correctly located at 'D:\android-sdk-windows\platform-tools\adb.exe' and can be executed.
</pre>

* 重启 Eclipse，不行。
* 查看 adb.exe 路径，没有问题。
* 查看 PATH 环境变量，没有将 D:\android-sdk-windows\platform-tools 添加到PATH，重启 Eclipse，还是没有作用。
* 执行 adb start-server ，提示

<pre>
adb server is out of date.  killing...
ADB server didn't ACK
* failed to start daemon *
</pre>

* 执行 adb nodaemon server ，结果为

<pre>
cannot bind 'tcp:5037'
</pre>

原来是端口冲突。

以管理员方式打开“附件”中的“命令提示符”（DOS界面），执行 netstat -abno ，在执行结果中查找 5037 端口对应的程序，结果是 wandoujia_daemon.exe 。
<pre>
  TCP    127.0.0.1:5037         0.0.0.0:0              LISTENING       5620
 [wandoujia_daemon.exe]
</pre>

这下问题就简单了，修改豌豆荚的设置，关闭“允许豌豆荚自动检测可以连接的手机”选项。然后关闭豌豆荚应用即可。
