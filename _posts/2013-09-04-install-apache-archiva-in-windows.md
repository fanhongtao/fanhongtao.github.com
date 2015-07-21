---
layout: post
title: Windows下安装 Apache Archiva
description:  Archiva 是Apache组织的一个Maven服务端管理软件。
categories: software
tags: [maven, archiva, windows]
copyright: cn
---

* content
{:toc}

# 1 下载版本

从 [Apache Archiva 官网](http://archiva.apache.org/index.cgi) 下载最新版本的Archiva。

我下载的版本是 Archiva 1.4-M4 Standalone

将压缩包 apache-archiva-1.4-M4-bin.zip 在任意目录下解压。

# 2 修改配置

进入 apache-archiva-1.4-M4/conf 目录

修改 jetty.xml 中的 jetty.port 为自己希望的端口。我将其修改成 8081 端口。


# 3 启动 Archiva

进入 apache-archiva-1.4-M4/bin 目录。在命令行（DOS窗口）执行 

<pre>
archiva console
</pre>

然后就可以在浏览器中使用 localhost:8081 访问 Archiva 的界面。 第一次访问时，会提示要创建  admin 用户。


# 4 修改 Repository 的目录

Archiva 缺省配置为 Repository 保存在 apache-archiva-1.4-M4/repositories/ 目录下。

考虑到以后会升级 Archiva， 所以，一般建议将 Repository 移到外部目录。

修改方法（以 internal 库为例进行说明）: 

* 使用admin 登录到 Archiva ，点击 “Repositories”，进入 Repositories 管理页面；
* 点击 internal 行， “Edit”列的按钮，进入对应 Repositoriy 的配置页面；
* 修改 Directory 。可以配置成相对路径，也可以配置成绝对路径。 如修改成， D:/Maven/repositories/internal
* 修改 Index Directory 。如修改成， D:/Maven/repositories/internal/.indexer
* 点击 “Save” 保存配置。

第一次点击“Save”时，会提示“Cannot forcefully unlock a NativeFSLock which is held by another indexer component: D:\Maven\repositories\internal\.indexer\write.lock” ，不用管它，再次点击“Save”即可正常返回到 Repositories 管理页面。

依次修改完  internal 和 snapshots 后，就可以通过 mvn 命令来访问了。

参考  [Maven仓库](/2013/04/06/maven-repository.html) 中“远端仓库的配置”部分来了解如何配置  .m2/settings.xml 对接Archiva。


# 5 配置 Archiva 服务

为了让 Archiva 在 Windows 开机时自动运行，需要将其配置成Windows的服务。

使用 Administrator 打开命令行窗口，执行下面的命令安装服务。 

<pre>
archiva install
</pre>


为了能立即检查服务是否正常，还可以执行下面的命令来启动该服务:

<pre>
archiva start
</pre>




