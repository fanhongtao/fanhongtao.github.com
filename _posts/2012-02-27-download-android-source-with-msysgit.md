---
layout: post
title: Windows下使用msysgit下载Android代码
description:  通过一个bash脚本来下载Android代码
categories: programming
tags: [android]
copyright: cn
---

Android 官方建议使用Python脚本 repo 来管理代码，并且建议在Linux下执行该脚本。

大部分人其实都不会去修改Android代码，仅仅是想下载来看看而已。为了这小小的需求而去倒腾一个Linux 或 cygwin 都不太合算。所以才有了本文。

repo 只是对Git命令进行了封装，所以我们可以绕过repo直接使用Git命令来下载。

为了方便大家，这里提供了一个Bash脚本，实现一个命令下载完整的Android代码。

脚本模拟了repo的下载功能和部分更新功。在Android目录结构没有变化的情况下，脚本能够很好的工作，如果有一天Android将一个Git目录移动到另一个目录下，则本脚本会下载新的目录，但老目录下的代码不会被删除。

虽然有些限制，但毕竟胜在简单，只需要安装一个 [msysgit](http://code.google.com/p/msysgit/) 就可以正常工作。

使用方法：

进入 msysgit 命令行界面，在目标目录下执行附件的脚本（需要先解压）即可。
 
如：在 D:\android 目录下，执行： 

{% highlight bash %}
./sync_android_repos.sh
{% endhighlight %}

执行完成后，会将代码下载到 D:\android 目录下。

如果下载过程中网络不好而中断，还可以多次执行该脚本，直到成功为止。

脚本下载地址： [sync_android_repos.sh](/attachments/sync_android_repos.sh)
