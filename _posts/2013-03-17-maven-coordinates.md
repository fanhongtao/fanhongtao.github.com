---
layout: post
title: Maven坐标
description:  Maven是如何唯一标识一个构件的
categories: maven
tags: [maven]
copyright: cn
---

# 1. Maven坐标
一个最简单的pom.xml示例：

{% highlight xml %}
<project xmlns="http://maven.apache.org/POM/4.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
                      http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.fanhongtao</groupId>
    <artifactId>fht-library-common</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>
</project>
{% endhighlight %}

Maven 要求一个项目对应的 groupId:artifactId:version 必须唯一。

* groupId: 通常用于唯一标识一个组织或项目。一般使用组织（项目）的反向域名作为 groupId ，如 Maven 核心构件对应的 groupId 都是 org.apache.maven 。这个并不是强制要求，如JUnit就使用 junit 作为其groupId。
* artifactId: 一个项目的名称。groupId和artifactId应该能够将一个项目和世界上的所有其它项目区分开。默认情况下，Maven生成的构件都会以 artifactId 开头。
* version: 指明项目的版本号。
* packaging: 项目的打包方式。打包方式通常会与构件的文件扩展名对应，如不指定，缺省值为jar。目前的可选值有： pom, jar, maven-plugin, ejb, war, ear, rar, par。Maven会根据不同的打包方式选用不同的命令对项目进行打包。 包含packaging的坐标格式为： groupId:artifactId:packaging:version
* classifier:  可以理解为附属构建的后缀，如源码包的classifier为 sources。包含classifier的坐标格式为： groupId:artifactId:packaging:classifier:version

Maven生成的构件文件名与坐标对应，格式： artifactId-version[-classifier].packaging 
当将生成的构件存放在仓库中时，Maven会将构件保存在 $M2_REPO/groupId/artifactId/version 目录下。其中，groupId中的"."会被替换成"/"。

以上面的pom.xml为例，Maven会生成一个名为 fht-library-common-1.0-SNAPSHOT.jar 的包，如果生成源码包，名字为 fht-library-common-1.0-SNAPSHOT-sources.jar。存放在 $M2_REPO/org/fanhongtao/fht-library-common/1.0-SNAPSHOT 目录下。

# 参考
* [Maven Coordinates](http://maven.apache.org/pom.html#Maven_Coordinates)
