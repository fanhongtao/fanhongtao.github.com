---
layout: post
title: 使用ANT编译Android apk文件
description:  使用ANT编译Android apk文件的基本步骤
categories: android
tags: [android, apk, ant]
copyright: cn
---

前提：需要安装 [Ant](http://ant.apache.org/bindownload.cgi) 1.8或以上版本。

# 1 编译步骤

## 第一步：创建临时工程

进入 android-sdk-windows\tools\ 目录，执行下面的命令，创建一个临时工程：

{% highlight bash %}
android create project -k com.foo -a Test1 -t android-8 -p d:\temp
{% endhighlight %}

## 第二步：拷贝文件

进入 D:\temp 目录，将该目录下的 build.properties、 build.xml 和 local.properties 三个文件拷贝到自己真实的工程目录下。
 
## 第三步：修改 build.properties
修改自己真实工程目录下的 build.properties 文件，在文件末尾增加以下内容

{% highlight properties %}
key.store = D:/keystore/app1.keystore
key.alias = abc
 
key.store.password = 123456
key.alias.password = 123123
 
java.encoding = UTF-8
java.target = 1.6
java.source = 1.6
{% endhighlight %}

Java相关的三个项可以根据项目情况选择是否需要。java.encoding 缺省值为 ascii，java.target 和java.source 的缺省值都是 1.5。

## 第四步：修改 build.xml

将工程名从 Test1 修改成自己真实的工程名。

{% highlight xml %}
<project name="Test1" default="help">
{% endhighlight %}

## 第五步：编译发布版本

在工程所在目录下，执行

{% highlight bash %}
ant release
{% endhighlight %}

这里假设已经将 %ANT_HOME%\bin 目录加入到 PATH 中。

生成的apk存放在 工程的 bin 目录下，如：D:\temp\bin\Test1-release.apk
 
# 2 补充说明

如果有多个Android工程，可以将第一个工程下的 build.properties、 build.xml 和 local.properties 文件拷贝到其它各工程目录，然后只需要修改 build.xml 中的工程名即可（第一个工程已经修改过 build.properties文件了）。
