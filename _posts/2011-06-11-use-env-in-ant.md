---
layout: post
title: Ant中访问环境变量
description:  在Ant脚本中如何访问环境变量？
categories: ant
tags: [ant]
copyright: cn
---

下面的代码显示了如何在一个Ant脚本中访问环境变量 JAVA_HOME

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8" ?> 
<project name="TestProject" default="echo" basedir="."> 
    <property environment="env"/>
    <target name="echo">
        <echo message="${env.JAVA_HOME}"/> <!-- 显示环境变量JAVA_HOME的值 -->
    </target>
</project>
{% endhighlight %}
