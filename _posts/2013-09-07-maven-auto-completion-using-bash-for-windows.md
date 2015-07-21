---
layout: post
title: 配置 Windows下 Maven 命令行自动补全功能
description:  基于 Mingw 的Bash
categories: software
tags: [maven, bash]
copyright: cn
---

Maven 的各种插件提供了很多 Goals，不太可能记住这些。所以有必要开启命令行的自动补全功能。

Windows的CMD脚本功能太简单，使用不方便。同时由于需要使用 Git，我安装了 [msysgit](https://code.google.com/p/msysgit/)，而它自带的 Bash 窗口则成为了我日常工作中主要使用的命令行界面。所以这里也只讲如何基于 msysgit 的 Bash 来实现自动补全。

先从 [Maven Integration with Bash](http://jira.codehaus.org/browse/MNG-3928) 下载最新的用于实现自动补全的文件： m2。

将下载的 m2 文件拷贝到 git 的安装目录下的 etc 目录。 如，我是拷贝到 d:\Program Files\Git\etc\ 目录。

修改 etc 目录下的 profile 文件， 在文件最后增加一行

<pre>
. /etc/m2
</pre> 

注意，第一个字符是英文的“.”（大于号下面的那个），前面不能有空格、Tab。

然后，新打开一个 Bash 界面， 键入 “mvn”，再按两下TAB键，就会提示
<pre>
$ mvn
Display all 518 possibilities? (y or n)
</pre>

也可以输入部分内容，如输入 “mvn depe”，再按两下TAB键，会先补全成
<pre>
$ mvn dependency\:
</pre>

再按一下TAB，会显示成为：
<pre>
$ mvn dependency\:
dependency:analyze                 dependency:copy-dependencies       dependency:sources
dependency:analyze-dep-mgt         dependency:go-offline              dependency:tree
dependency:analyze-only            dependency:list                    dependency:unpack
dependency:analyze-report          dependency:purge-local-repository  dependency:unpack-dependencies
dependency:build-classpath         dependency:resolve
dependency:copy                    dependency:resolve-plugins
</pre>


# 参考
* [List all of the possible goals in Maven 2?](http://stackoverflow.com/questions/3996802/list-all-of-the-possible-goals-in-maven-2)

