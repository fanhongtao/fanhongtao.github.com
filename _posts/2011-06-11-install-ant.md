---
layout: post
title: Ant安装
description:  安装Ant的最基本步骤
categories: software
tags: [ant]
copyright: cn
---

1、从 http://ant.apache.org/bindownload.cgi 下载Ant的最新版本，并在适当的目录下解压。 
   假设将其在 /home/fht 下解压，得到 /home/fht/ant-1.8.2 目录。 

2、设置环境变量： 

{% highlight bash %}
export ANT_HOME=/home/fht/ant-1.8.2
{% endhighlight %}

3、将Ant的 bin 目录添加至 PATH  

{% highlight bash %}
export PATH=${ANT_HOME}/bin:${PATH}
{% endhighlight %}

为了让Ant能够正常运行，还需要设置 JAVA_HOME 环境变量。将其指向Java的安装目录。如：

{% highlight bash %}
export JAVA_HOME=/opt/java
{% endhighlight %}

否则，在执行Ant时会报错：Unable to locate tools.jar