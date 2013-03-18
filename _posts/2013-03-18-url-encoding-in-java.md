---
layout: post
title: URL编码的简易方式
categories: java
tags: [java]
copyright: cn
---

在编写HTTP客户端时，需要对URL中ASCII字符集以外的字符进行编码。

从 StackOverflow中找到一个简易的方式，代码如下：

{% highlight java %}
String urlStr = "http://abc.dev.domain.com/0007AC/ads/800x480 15sec h.264.mp4";
URL url = new URL(urlStr);
URI uri = new URI(url.getProtocol(), url.getUserInfo(), url.getHost(), url.getPort(), url.getPath(), url.getQuery(), url.getRef());
url = uri.toURL();
{% endhighlight %}


原文出处：

* [HTTP URL Address Encoding in Java](http://stackoverflow.com/questions/724043/http-url-address-encoding-in-java) 中 Craig B 的答复
