---
layout: post
title: 通过HTTPS方式访问google搜索
description:  如何稳定的访问google搜索
categories: computer
tags: [google]
---

Google搜索在国内经常无法正常访问，这里提供的方法可以通过 https 方式来访问，从此告别“连接被重置”的烦恼。、

# 修改Host文件

Windows XP系统里的目录在C:\WINDOWS\system32\drivers\etc下， 其他操作系统请参见[Hosts文件](http://zh.wikipedia.org/wiki/Hosts%E6%96%87%E4%BB%B6)。

用记事本打开 hosts 文件，在最下面添加如下内容，然后保存即可。

<pre>
203.208.46.148 encrypted.google.com
203.208.46.148 encrypted-tbn0.google.com
203.208.46.148 encrypted-tbn1.google.com
203.208.46.148 encrypted-tbn2.google.com
203.208.46.148 encrypted-tbn3.google.com
203.208.46.148 encrypted-tbn4.google.com
203.208.46.148 encrypted-tbn5.google.com
203.208.46.148 encrypted-tbn6.google.com
203.208.46.148 encrypted-tbn7.google.com
203.208.46.148 encrypted-tbn8.google.com
203.208.46.148 encrypted-tbn9.google.com
203.208.46.148 encrypted.google.com.hk
</pre>

注意：

* Windows Vista 和 Windows 7 用户请先使用管理员权限打开记事本，然后将 hosts 文件拖进记事本中。
* 该操作可能会受到瑞星之类的杀毒软件的监控，因此要让杀毒软件允许该操作。

# 访问
先访问一次 [http://www.google.com/ncr](http://www.google.com/ncr)

然后再访问 [https://encrypted.google.com/][google]，建议将 [https://encrypted.google.com/][google] 加入收藏夹，以后就可以通过它来进行搜索了。


[google]: https://encrypted.google.com/
