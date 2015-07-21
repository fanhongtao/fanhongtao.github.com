---
layout: post
title: input元素提示用户已输入字符
description:  支持输入，删除，粘贴操作
categories: programming
tags: [js]
copyright: cn
---

当用户在页面上输入字符时，如果能将当前已输入的字符数提示给用户，会带来较好的用户体验。特别是在输入框有长度限制的时候。

之前我们的做法是捕获onkeypress、onkeyup这样的事件。通过捕获这些事件，可以在用户通过键盘输入时给予相应的提示，但如果用户通过鼠标右键菜单进行“粘贴”操作，就无法及时提示用户。

为了解决右键粘贴的问题，我们将思路转变为直接检测元素内容的变化，而不是捕获按键事件。IE下可以通过捕获 onpropertychange 事件，Fire Fox、Chrome则可以通过 addEventListener 来注册事件来实现。示例代码如下：

{% highlight html %}
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>

<body>
    <input id="text" /> 
    <div id="testInfo">已经输入:<span id="showMsg"></span></div>
</body>

<script> 
    //当状态改变的时候执行的函数 
    function handle() 
    {
        document.getElementById("showMsg").innerHTML= document.getElementById("text").value.length; 
    } 

    //firefox下检测状态改变只能用oninput,且需要用addEventListener来注册事件。 
    if (/msie/i.test(navigator.userAgent))    //ie浏览器 
    {
        document.getElementById("text").onpropertychange=handle 
    } 
    else 
    {
        //非ie浏览器，比如Firefox 
        document.getElementById("text").addEventListener("input", handle, false); 
    } 
</script> 
</html>
{% endhighlight %}

上面的代码已经在 IE7、FF3.6.3、Chrome 8.0 中验证通过。
