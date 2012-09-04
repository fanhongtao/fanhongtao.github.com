---
layout: post
title: AutoHotKey
description:  AutoHotKey基本说明及我在使用时的一点小技巧
categories: tool
tags: [tool, autohotkey]
copyright: cn
---

2003年，Chris Mallett 提议在 AutoIt v2 中集成热键支持，未得到预期响应，于是开发了 AutoHotkey 。因为后期 AutoHotkey 更新速度较慢，其他程序员也发布了一些改进分支。其中，Lexikos 维护的 AutoHotkey_L 分支影响最大。Chris Mallett 于 2010年10月认可了 AutoHotkey_L 的继承地位，并改称原版本为 AutoHotkey Basic。

因为使用过程中会涉及中文，所以建议[下载 AutoHotkey_L 版本|http://www.autohotkey.net/~Lexikos/AutoHotkey_L/AutoHotkey_L_Install.exe]，软件安装包约2.5M
。可以通过GitHub下载[L版本源码|https://github.com/Lexikos/AutoHotkey_L]。

* 官方网站：<http://www.autohotkey.com/>
* 中文论坛：<http://ahk.5d6d.com/>
* 善用佳软上的[AutoHotkey 学习指南](http://xbeta.info/autohotkey-guide-2.htm)

# 1. Default Script

When run AutoHotKey for the first time, AHK will ask you to write a default script into 'My Document' (%userprofile%/My Documents).

Since AHK can run without install, so I prefer to move the default srcipt 'AutoHotkey.ahk' to where AHK is. ( 'C:\Program Files\AutoHotkey\', for example). After that, we can zip the AHK folder, and copy it to another computer. Then, the two computers have the same configurations.

# 2. AHK Group
If we want to add a shutcut to IE, we can use the fellowing script. 
{% highlight ahk %}
#IfWinActive ahk_class IEFrame
    ; Ctrl-F1 to input URL of Google
    ^F1::SendInput  http://www.google.com.hk
#IfWinActive
{% endhighlight %}

But if we switch from IE to FireFox or Chrome, we can use Group to make the code simpler. 
{% highlight ahk %}
; Define commonly used browseres
GroupAdd, Browser, ahk_class IEFrame                ; IE & Mathon
GroupAdd, Browser, ahk_class MozillaWindowClass     ; FireFox
GroupAdd, Browser, ahk_class Chrome_WidgetWin_0     ; Chrome

#IfWinActive ahk_group Browser
    ; Ctrl-F1 to input URL of Google
    ^F1::SendInput  http://www.google.com.hk
#IfWinActive
{% endhighlight %}


The definition of group <b>MUST</b>  be at the top of AHK script.

If not, the group will no work. It cost me about 4 hours to find out why my group did't work. 

You don't want do it again, aren't you?

