---
layout: post
title: 访问WebApp之外的资源
description:  如何配置才能在Tomcat中访问WebApp之外的资源，如：外部音视频文件。
categories: tomcat
tags: [tomcat]
copyright: cn
---
为了访问WebApp之外的资源，如通过 ln -s 命令将其它目录下的一个文件（或目录）链接到app目录下。需要在 Context 中设置 allowLinking 为true。 最简单的 Context.xml 配置为：
{% highlight xml %}
<Contex allowLinking="true">
    <?xml version="1.0" encoding="utf-8" ?>
</Contex>
{% endhighlight %}

可以在 app 目录下创建一个 META-INF 目录，将  Context.xml  文件放在其下。

<b>注：这一功能不适用于Windows操作系统，因为其不支持软链接。</b>


