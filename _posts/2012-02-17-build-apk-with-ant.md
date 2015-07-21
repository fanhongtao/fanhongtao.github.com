---
layout: post
title: 使用ANT编译Android apk文件
description:  使用ANT编译Android apk文件的基本步骤
categories: programming
tags: [android, ant]
copyright: cn
---

* content
{:toc}

前提：需要安装 [Ant](http://ant.apache.org/bindownload.cgi) 1.8或以上版本。

# 1 编译步骤

## 第一步：创建临时工程

进入 android-sdk-windows\tools\ 目录，执行下面的命令，创建一个临时工程：

{% highlight bash %}
android create project -k com.foo -a Test1 -t android-8 -p d:\temp
{% endhighlight %}

## 第二步：拷贝文件

进入 D:\temp 目录，将该目录下的 ant.properties、 build.xml、local.properties 三个文件拷贝到自己真实的工程目录下。

如果工程目录下没有 proguard-project.txt ，也将 D:\temp 目录下的该文件一并拷贝。 
 
## 第三步：修改 build.properties
修改自己真实工程目录下的 ant.properties 文件，在文件末尾增加以下内容

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

## 第五步：配置 proguard （可选步骤）

将 project.properties 文件中的以下行的注释（字符"#"）删除。

<pre>
proguard.config=${sdk.dir}/tools/proguard/proguard-android.txt:proguard-project.txt
</pre>

根据自己的需要修改 proguard-project.txt 文件。

## 第六步：编译发布版本

在工程所在目录下，执行

{% highlight bash %}
ant release
{% endhighlight %}

这里假设已经将 %ANT_HOME%\bin 目录加入到 PATH 中。

生成的apk存放在 工程的 bin 目录下，如：D:\temp\bin\Test1-release.apk

# 2 补充说明

如果有多个Android工程，可以将第一个工程下的 ant.properties、 build.xml 和 local.properties 文件拷贝到其它各工程目录，然后只需要修改 build.xml 中的工程名即可（第一个工程已经修改过 ant.properties文件了）。

# 修订纪录

* 2013-09-08 根据新的Android SDK所涉及的文件进行修改，同时增加对ProGurad的说明。
