---
layout: post
title: 在Eclipse中导出Android apk文件
categories: android
tags: [android, eclipse]
copyright: cn
---

下安装到Android手机上的apk需要签名，本文描述了如何创建自己的签名及从Eclipse中导出apk。 

在Eclipse中选择一个Android工程，然后点击鼠标右键菜单中的“Export”： 

<a href="http://imgur.com/5KSJU"><img src="http://i.imgur.com/5KSJU.png" title="Hosted by imgur.com" alt="" /></a>

选择“Android”->;“Export Android Application”，点击“Next”： 

<a href="http://imgur.com/6C0lc"><img src="http://i.imgur.com/6C0lc.png" alt="" title="Hosted by imgur.com" /></a>

由于我们之前已经选择了工程，所以直接点击“Next”，

<a href="http://imgur.com/nhWNY"><img src="http://i.imgur.com/nhWNY.png" title="Hosted by imgur.com" alt="" /></a>

由于我们还没有keystore，所以选择“Create new keystore”，然后指定 keystore 的路径和密码（假设为 123456）。最后点击“Next”。 

<a href="http://imgur.com/NrXA4"><img src="http://i.imgur.com/NrXA4.png" title="Hosted by imgur.com" alt="" /></a>

输入 Alias 名称（一个 keystore 里面可以有多个 Alias） 和该 Alias对应的密码（假设为 123123），指定Alias的有效期（这里输入了100，表示100年）。界面下文的这些文本框中输入能够表示自己身份的信息，必须至少输入一个，这里我输入了自己的姓名拼音。最后点击“Next”。 

<a href="http://imgur.com/r5ELm"><img src="http://i.imgur.com/r5ELm.png" title="Hosted by imgur.com" alt="" /></a>

输入想要导入 apk 的名称，然后点击“Finish”。 

这样我们就得到了一个已经签名的apk。 
