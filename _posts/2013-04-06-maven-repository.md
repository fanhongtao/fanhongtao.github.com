---
layout: post
title: Maven仓库
description:  Maven是如何组织构件的
categories: maven
tags: [maven]
copyright: cn
---

# 1. 仓库简介

Maven仓库是指统一存放Maven构件的及其依赖关系的地方。

仓库分为本地仓库和远端仓库。

<pre>
Maven仓库
|-- 本地仓库（local repository）
\-- 远端仓库（remote repository）
    |-- 中央仓库（Central Repository）
    |-- 内部仓库（Internal Repository）
    \-- 其它仓库
</pre>

## 1.1. 本地仓库

本地仓库缺省路径为 .m2/repository, 也可以通过修改 .m2/settings.xml 来指定一个新的存放位置。

当执行 <b>mvn clean install</b> 时，就会将项目的构件安装到本地仓库中。这样，本机的其它项目就可以使用该构件。

## 1.2. 中央仓库

特指 Maven 项目所提供的，供 Maven 下载所需要构件的仓库。

所有项目的 pom.xml 都会继承自超级POM，在超级POM定义了中央仓库的地址，这也是为什么Maven缺省就可以知道从那里下载构件的原因。

[超级POM的内容](https://github.com/apache/maven/blob/master/maven-model-builder/src/main/resources/org/apache/maven/model/pom-4.0.0.xml)

* 中央仓库固定使用 central 作为仓库的ID。
* 中央仓库的地址： http://repo.maven.apache.org/maven2

## 1.3. 内部仓库

内部仓库通常是一个组织内部所搭建的Maven仓库。用于：

1. 缓存中央仓库的构件，从而可以节省外网带宽。
2. 保存组织内部特有的构建。如一些特殊的Jar包，不适合放在中央仓库，就可以放在内部仓库中。

可以通过[Apache Achiva][Achiva]来搭建内部仓库。

## 1.4. 其它仓库

由Maven项目以外的第三方所提供的，供Maven下载构件的仓库。如：JBoss所提供的仓库： http://repository.jboss.com/maven2/

# 2 远端仓库的配置

这里主要是以[Apache Achiva][Achiva]为例，讲如何将一个构件部署到自己搭建的内部仓库中。

# 2.1 配置远端仓库的认证信息

为了将构建部署到远端仓库，需要在 .m2/settings.xml 中配置远端仓库的认证信息。

{% highlight xml %}
<settings>
    ......
    <servers>
        <server>
          <id>archiva.internal</id>
          <username>{archiva-deployment-user}</username>
          <password>{archiva-deployment-pwd}</password>
        </server>
        <server>
          <id>archiva.snapshots</id>
          <username>{archiva-deployment-user}</username>
          <password>{archiva-deployment-pwd}</password>
        </server>
    </servers>
    ......
</settings>
{% endhighlight %}

上面配置了两个仓库的信息，archiva.internal用于部署发布版本，archiva.snapshots则用于部署快照版本。

# 2.2 在 pom.xml中配置distributionManagement

在所要部署的项目的 pom.xml 中配置 distributionManagement 元素。所配置的 id 必须是在 settings.xml 中已有的 id.

{% highlight xml %}
<project>
    ......
    <distributionManagement>
        <repository>
            <id>archiva.internal</id>
            <name>Internal Release Repository</name>
            <url>http://reposerver.mycompany.com:8080/repository/internal/</url>
        </repository>
        <snapshotRepository>
            <id>archiva.snapshots</id>
            <name>Internal Snapshot Repository</name>
            <url>http://reposerver.mycompany.com:8080/repository/snapshots/</url>
        </snapshotRepository>
    </distributionManagement>
    ......
</project>
{% endhighlight %}

注意：参数资料 [Deploying to Repository][deploy] 中的地址多了字符串 archiva ，与实际的地址不符。

通过命令： <b>mvn clean deploy</b> 将构件部署到内部仓库。

# 2.3 使用内部仓库中的构件

一个工程需要使用内部仓库上的构件时，需要在该工程的 pom.xml 中配置内部工程的地址，及所依赖的构件信息。

配置内部工程的地址:

{% highlight xml %}
<project>
    ......
    <repositories>
        <repository>
            <id>archiva.internal</id>
            <name>Internal Release Repository</name>
            <url>http://localhost:8081/repository/internal/</url>
            <releases>
                <enabled>true</enabled>
            </releases>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </repository>
        <repository>
            <id>archiva.snapshots</id>
            <name>Internal Snapshot Repository</name>
            <url>http://localhost:8081/repository/snapshots/</url>
            <releases>
                <enabled>false</enabled>
            </releases>
            <snapshots>
                <enabled>true</enabled>
            </snapshots>
        </repository>
    </repositories>
    ......
</project>
{% endhighlight %}

注意，

* archiva.internal 的releases中的enable配置为true，表示可以从该仓库中获取发布版本。snapshots配置为false，表示不能获取快照版本。
* archiva.snapshots 的releases中的enable配置为false，表示不能从该仓库中获取发布版本。snapshots配置为false，表示可以获取快照版本。

# 参考
* [Introduction to Repositories](http://maven.apache.org/guides/introduction/introduction-to-repositories.html)
* [Deploying to Repository][deploy]

[Achiva]: http://archiva.apache.org/
[deploy]: http://archiva.apache.org/docs/1.4-M4-SNAPSHOT/userguide/deploy.html
