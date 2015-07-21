---
layout: post
title: Ajax应用支持浏览器后退/前进
description:  如何在使用Ajax的页面中实现对后退/前进支持.
categories:  programming
tags: [ajax]
copyright: cn
---

* content
{:toc}

## 1	问题引入
Ajax有很多好处，可以

* 实现页面的局部刷新
* 减少服务器与浏览器之间的数据交互
* ……

但会带来一个问题：由于应用总是在一个页面上，所以浏览器的后退按钮无法使用（没有后退，也就没有前进一说）。

##2	解决思路

### 2.1	新地址
无法使用后退键，是因为在Ajax请求时并没有修改浏览器中的地址，从浏览器的角度来看，所访问的页面没有发生变化，所以也就不能提供后退的功能。

解决的思路就是在进行Ajax调用时修改浏览器所记录的地址，让浏览器认为访问了一个新的“页面”。
由于我们不想刷新整个页面，只是希望刷新一部分内容，所以在修改浏览器地址时，不能让浏览器去重新请求页面。于是我们借用了“锚点”这种技术。

###2.2	锚点
百度百科是这样定义 “锚点”的：

<pre>
全称：anchor
使用命名锚记可以在文档中设置标记，这些标记通常放在文档的特定主题处或顶部。
然后可以创建到这些命名锚记的链接，这些链接可快速将访问者带到指定位置。
创建到命名锚记的链接的过程分为两步。首先，创建命名锚记，然后创建到该命名锚记的链接。
</pre>

锚点的本意是实现页面内部的跳转，所以使用锚点进行页面跳转不会导致浏览器发起新请求。

最常用锚点的莫过于一个页面中的“返回顶部”功能。

实现“返回顶部”功能的示意代码：
{% highlight html %}
<!-- 在页面顶部定义一个名为“top”锚点 -->
<a name="top"></a>

<!-- 在页面底部提供一个访问“top”锚点的链接 -->
<a href="#top">返回顶部</a>
{% endhighlight %}

##3 测试代码

###3.1 Content.jsp
用于响应Ajax请求的页面。
页面名称分别为 ajax_content1.jsp 和 ajax_content2.jsp，内容基本相同，只是将黄色字体中的1修改成2，用于区分两个不同的请求。

{% highlight jsp %}
<%@ page language="java" contentType="text/html; charset=UTF-8" 
    pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat, java.util.Date" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>Ajax content 1</title>
</head>
<%
    response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1 
    response.setHeader("Pragma", "no-cache");        //HTTP 1.0 
    response.setDateHeader("Expires", 0);            //prevents caching at the proxy server
    SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String timeStr = formater.format(new Date());
%>
<body>
    Request time: <%=timeStr%><br>
    Session ID: <%=session.getId() %><br>
    This is content 1.<br>
</body>
</html>
{% endhighlight %}

###3.2 ajax_test.css

用于设置链接的格式
{% highlight css %}
@CHARSET "UTF-8";
a {color: #0000FF; text-decoration:none}
a:hover {color: #FF0000}    /* 当有鼠标悬停在链接上 */
{% endhighlight %}

### 3.3 ajax1.jsp

{% highlight jsp %}
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat, java.util.Date" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<!--
实现以下功能： 
1、Ajax请求时，修改浏览器地址
2、打开页面时，默认显示第一个链接的内容
3、没有实现后退时自动刷新内容
-->
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>Ajax test 1</title>
    <link rel="stylesheet" type="text/css" href="ajax_test.css"/> 
</head>
<%
    response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1 
    response.setHeader("Pragma", "no-cache");        //HTTP 1.0 
    response.setDateHeader("Expires", 0);            //prevents caching at the proxy server
    SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String timeStr = formater.format(new Date());
%>
<body>
    Request time: <%=timeStr%><br>
    Session ID: <%=session.getId() %><br><br>
    <a onclick="callServer('content1')" id="content1">content1</a>&nbsp
    <a onclick="callServer('content2')" id="content2">content2</a><br>
    <textarea id="content" rows="20" cols="80"></textarea>
</body>

<script type="text/javascript" src="jquery-1.4.4.min.js"></script>
<script>
function callServer(content) {
    var url = window.location.href.split("#")[0] + "#" + content;
    window.location.href=url;
    $('#content').load(window.location.pathname.replace("1.jsp", "_" + content + ".jsp"));
}
callServer("content1");
</script>

</html>
{% endhighlight %}

代码要点：

1. 通过 window.location.href 来访问和更新浏览器的地址
2. 通过JQuery的 .load 方法实现Ajax调用
3. 通过 window.location.pathname 来获取jsp页面的路径名，避免使用绝对路径

###3.4 ajax2.jsp

在 HTML5 中，有一个hashchange事件，当浏览器URL的hash值（即 #号后面的部分）发生变化时，会触发该事件。

由于IE从IE 8才开始支持该事件，所以不能满足我们应用对浏览器的要求。只有等IE 8成为主流后，才能使用这样的实现方法。

{% highlight jsp %}
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat, java.util.Date" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<!--
实现以下功能： 
1、Ajax请求时，修改浏览器地址
2、打开页面时，默认显示第一个链接的内容
3、通过 HTML 5 规范中的 hashchange 事件支持后退、前进按钮。
    支持IE8、 FireFox 3.6.3、 Chrome 8.0。
    由于 IE7、IE6不支持hashchange 事件，无法正常使用。
-->
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>Ajax test 2</title>
    <link rel="stylesheet" type="text/css" href="ajax_test.css"/> 
</head>
<%
    response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1 
    response.setHeader("Pragma", "no-cache");        //HTTP 1.0 
    response.setDateHeader("Expires", 0);            //prevents caching at the proxy server
    SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String timeStr = formater.format(new Date());
%>
<body>
    Request time: <%=timeStr%><br>
    Session ID: <%=session.getId() %><br><br>
    <a href="#content1" id="content1">content1</a>&nbsp
    <a href="#content2" id="content2">content2</a><br>
    <textarea id="content" rows="20" cols="80"></textarea>
</body>

<script type="text/javascript" src="jquery-1.4.4.min.js"></script>
<script>
function onHashChange() {
    var arrays = window.location.href.split("#");
    var content = "content1";
    if (arrays.length > 1) {
        content=arrays[1]
    }
    $('#content').load(window.location.pathname.replace("2.jsp", "_" + content + ".jsp"));
}

$(window).bind('hashchange', onHashChange);
$(window).trigger("hashchange");
</script>

</html>
{% endhighlight %}

代码要点：

1. 直接使用链接的 href 来进行页面跳转
2. 注册 hashchange 事件。

### 3.5 ajax3.jsp
对于使用了jQuery的项目，我们可以借助于jQuery的[address插件](http://www.asual.com/jquery/address)来实现。

由于该插件较好的处理了各种浏览器之间的差异，可以满足我们应用对浏览器的需求。


{% highlight jsp %}
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat, java.util.Date" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<!--
实现以下功能： 
1、Ajax请求时，修改浏览器地址
2、打开页面时，默认显示第一个链接的内容
3、通过jQuery 插件  address 支持后退、前进按钮。
    支持IE 6~8、 FireFox 3.6.3、 Chrome 8.0。
-->
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>Ajax test 3</title>
    <link rel="stylesheet" type="text/css" href="ajax_test.css"/> 
</head>
<%
    response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1 
    response.setHeader("Pragma", "no-cache");        //HTTP 1.0 
    response.setDateHeader("Expires", 0);            //prevents caching at the proxy server
    SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String timeStr = formater.format(new Date());
%>
<body>
    Request time: <%=timeStr%><br>
    Session ID: <%=session.getId() %><br><br>
    <a href="#content1" id="content1">content1</a>&nbsp
    <a href="#content2" id="content2">content2</a><br>
    <textarea id="content" rows="20" cols="80"></textarea>
</body>

<script type="text/javascript" src="jquery-1.4.4.min.js"></script>
<script type="text/javascript" src="jquery.address-1.3.2.min.js"></script>
<script>
function onAddressChange(event) {
    var content = "content1";
    if (event.value != "/") {
        content = event.value.replace('/', '');
    }
    $('#content').load(window.location.pathname.replace("3.jsp", "_" + content + ".jsp"));
}

$(function(){
    $.address.change(onAddressChange);
    $('a').address();
});
</script>

</html>
{% endhighlight %}


可以从 [http://github.com/asual/jquery-address.git](http://github.com/asual/jquery-address.git) 下载最新的address插件。
