---
layout: post
title: Maven Archetype
description:  Maven Archetype插件常见用法。
categories: software
tags: [maven]
copyright: cn
---

* content
{:toc}

# 1. 简介

Maven Archetype 用于快速生成项目骨架。

# 2. 使用Archetype

## 2.1 交互模式（Interactive mode）

通过交互模式创建一个工程：
<pre>
mvn archetype:generate
</pre>
执行上述命令后，Archetype插件会输出一个Archetype列表供用户选择，目前共有745个备选项，由用户选择并输入自己想使用的 Archetype 对应的编号。缺省为 maven-archetype-quickstart 对应的值。

maven-archetype-quickstart 用于创建一个引用了JUnit的Java项目。如果想创建一个Web应用，可以选择 maven-archetype-webapp 。

选择了 Archetype 后，还需要输入一些参数：
* groupId : 项目的groupId
* artifactId : 项目的artifactId
* version : 项目的 version
* package : 项目的默认Java包名。

## 2.2 批处理模式（Batch mode）
使用批处理模式直接创建一个工程：
<pre>
mvn archetype:generate -B -DarchetypeArtifactId=maven-archetype-quickstart -DgroupId=org.fanhongtao -DartifactId=lib1 -Dversion=1.0-SNAPSHOT
</pre>
上面的命令使用 “maven-archetype-quickstart” 创建了一个坐标为 “org.fanhongtao:lib1:1.0-SNAPSHOT” 的工程。


## 2.3 Filter
使用Filter过滤候选的archetype：
<pre>
mvn archetype:generate -Dfilter=struts:
mvn archetype:generate -Dfilter=:struts
</pre>

* 第一个命令用于过滤 groupId 中包含字符串"struts"的archetype
* 第二个命令用于过滤 artifactId 中包含字符串"struts"的archetype

## 2.4 查看帮助
查看 archetype 插件的帮助信息：
<pre>
mvn help:describe -Dplugin=archetype
</pre>

查看更为详细的帮助信息：
<pre>
mvn help:describe -Dplugin=archetype -Ddetail
</pre>

# 参考
* [Introduction to Archetypes](http://maven.apache.org/guides/introduction/introduction-to-archetypes.html)


