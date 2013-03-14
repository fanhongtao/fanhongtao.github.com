---
layout: post
title: Maven入门
description:  简介Maven的最简单的用法
categories: java
tags: [java, maven]
copyright: cn
---

# 1. 安装

从[Apache Maven](http://maven.apache.org/download.cgi)下载最新的Maven版本。（我下载的是 apache-maven-3.0.5-bin.zip）

将压缩包拷贝到安装目录，（假设是：d:\Java\Apache\），执行如下命令解压：
<pre>
jar -xvf apache-maven-3.0.5-bin.zip
</pre>

解压后得到一个 apache-maven-3.0.5 目录。

然后设置环境变量： M2_HOME, 取值为Maven的安装目录， d:\Java\Apache\apache-maven-3.0.5 

除了命令行方式之外，还可以在Eclipse中安装 [m2eclipse 插件](http://www.sonatype.org/m2eclipse/)。

# 2. 基本概念

## 2.1 ~/.m2 目录

运行 Maven 后，会在用户的HOME目录下创建一个 .m2 目录。

Maven会在该目录下查找用户级的配置文件 settings.xml。（缺省无文件，如果需要配置，可以从 $M2_HOME/conf 目录下拷贝一个过来，然后进行修改）。

缺省情况下，本地仓库会保存在 ~/.m2/repository 目录。用户可以在 settings.xml 修改本地仓库的保存路径。

## 2.2 POM

POM（Project Object Model，项目对象模型）。

Mavan依赖于一个名为 pom.xml 的文件来对项目进行管理，类似于Ant中的build.xml。



# 3. 常用命令

在有 pom.xml 文件的目录下，执行以下命令
<table width="100%">
    <thead>
        <tr><th>命令</th><th>用途</th></tr>
    </thead>
    <tbody>
        <tr><td>mvn archetype:generate</td><td>创建一个符合Maven约定的空工程</td></tr>
		<tr><td>mvn clean</td><td>清除上一次构建所生成的文件</td></tr>
		<tr><td>mvn compile</td><td>编译源码</td></tr>
		<tr><td>mvn test</td><td>测试（包括编译源码、执行测试用例）</td></tr>
		<tr><td>mvn install</td><td>将包安装到本地仓库，以便其它项目可以使用</td></tr>
		<tr><td>mvn deploy</td><td>将包安装到远端仓库，以便其他开发人员可以使用</td></tr>
        <tr><td>mvn help:system</td><td>显示系统属性和环境变量</td></tr>
    </tbody>
</table>

# 参考：

* [操作系统常用术语](/2013/03/14/os-common.html)