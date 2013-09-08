---
layout: post
title: ProGuard使用Guava的Andriod项目
description:  一个Android项目，如果使用了Google的Guava，需要怎么配置才能正确使用ProGuard
categories: android
tags: [android, guava, proguard]
copyright: cn
---

# 1 额外的Jar包

如果一个Android工程中使用了 [Guava](https://code.google.com/p/guava-libraries)，则在[ProGuard](http://sourceforge.net/projects/proguard/)项目时，还需要引入两个额外的Jar包

* [jsr305](http://repo1.maven.org/maven2/com/google/code/findbugs/jsr305/2.0.1/jsr305-2.0.1.jar)
* [javax.inject](http://repo1.maven.org/maven2/javax/inject/javax.inject/1/javax.inject-1.jar)

下载后，一并放入 libs 目录。


如果熟悉Maven，可以先将在Android项目的 libs 目录下创建一个 pom.xml 文件，内容如下：

{% highlight xml %}
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>org.fanhongtao</groupId>
    <artifactId>ProGuard</artifactId>
    <packaging>jar</packaging>
    <version>1.0-SNAPSHOT</version>
    <name>depend-libs</name>
    <url>http://maven.apache.org</url>
    <dependencies>
        <dependency>
            <groupId>com.google.code.findbugs</groupId>
            <artifactId>jsr305</artifactId>
            <version>2.0.1</version>
        </dependency>
        <dependency>
            <groupId>javax.inject</groupId>
            <artifactId>javax.inject</artifactId>
            <version>1</version>
        </dependency>
    </dependencies>
</project>
{% endhighlight %}

然后执行 
<pre>
mvn dependency:copy-dependencies -DoutputDirectory="."
</pre>

即可自动将需要的Jar包下载到当前目录。最后删除 pom.xml 即可。

# 2 ProGuard 配置示例

<pre>
-dontoptimize
-dontobfuscate
-dontwarn sun.misc.Unsafe
-dontwarn com.google.common.collect.MinMaxPriorityQueue
</pre>

由于使用 Ant打包 APK时，会自动将包含 libs 目录下的 jar 包，所以不需要在 proguard-project.txt 中写类似如下的内容
<pre>
-injars libs/guava-r07.jar
-libraryjars libs/jsr305.jar
</pre>

# 参考
* [使用ANT编译Android apk文件](/2012/02/17/build-apk-with-ant.html)
* [使用ProGuard](/2013/09/09/using-proguard.html)
* [UsingProGuardWithGuava](https://code.google.com/p/guava-libraries/wiki/UsingProGuardWithGuava)
* [ANDROID, PROGUARD AND GUAVA’S EVENT BUS COMPONENT](http://www.marvinlabs.com/2013/01/22/android-proguard-and-guavas-event-bus-component/)
