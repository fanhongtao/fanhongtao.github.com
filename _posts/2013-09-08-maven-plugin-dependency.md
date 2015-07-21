---
layout: post
title: Maven 插件： Dependency
description:  Maven Dependency 插件常见用法。
categories: software
tags: [maven]
copyright: cn
---

* content
{:toc}

# 1. 简介

Maven Dependency 用管理项目所涉及到的构件（第三方构件），可以用于实现：

* 显示所依赖的构件信息
* 将依赖的构件拷贝到指定目录


# 2. 常用的 Dependency Goals

## 2.1 dependency:build-classpath

显示启动工程时Java命令的 -cp 参数。

如：我们需要写一个运行工程的BAT/Shell脚本，需要指定 -cp 参数时，就可以先执行
<pre>
mvn dependency:build-classpath
</pre>
然后根据命令的输出进行调整。

## 2.2 dependency:copy-dependencies

将工程所依赖的构件拷贝到指定的目录。如果不指定，则拷贝到 target\dependency 目录下。

如，下面的命令将依赖的构件拷贝到 libs 目录下。如果 libs 目录不存在，会自动创建。
<pre>
mvn dependency:copy-dependencies -DoutputDirectory="libs"
</pre>

## 2.3 dependency:list 

以列表方式显示工程所依赖的构件

## 2.4 dependency:sources

下载工程所依赖的构件的源码。

## 2.5 dependency:tree

以树型方式显示工程所依赖的构件

# 参考
* [Maven Dependency Plugin](http://maven.apache.org/plugins/maven-dependency-plugin/)


