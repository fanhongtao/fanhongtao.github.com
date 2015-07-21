---
layout: post
title: Scroll half page in the browser with AHK
description:  An AutoHotKey skill
categories: software
tags: [tool, autohotkey]
copyright: en
---

In the Browser, the default action of PageUp is scroll up a page. PageDown or SPACE is used to scroll down a page.

But I find while read articles in the Browser, it’s better to scroll half page. So that we can:

* Look the releative context in the screen.
* Keep the eyes look down instead of look up.

We don’t konw how to move half a page/screen. But we can mimic this by mouse wheel up/down event. So the AHK script looks like this.


{% highlight ahk %}
#IfWinActive ahk_group Browser
    +PgUp::Send  {WheelUp   5}              ; Shift-PageUp, scroll up half of screen
    +PgDn::Send  {WheelDown 5}              ; Shift-PageDown, scroll down half of screen
    +Space::Send {WheelDown 5}              ; Shift-Space, scroll down half of screen
#IfWinActive
{% endhighlight %}

Read [AHK Group](/2011/07/03/autohotkey.html) for the defination of ahk_group Browser.
