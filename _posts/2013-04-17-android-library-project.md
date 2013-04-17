---
layout: post
title: Android 的 Library 工程
categories: android
tags: [android, ant]
copyright: cn
---

# Library工程

除了普通的编译成 APK 的 Android 工程之外，还可以创建一种叫做 Library Project 的工程。这种类型的工程不生成APK，而是生成供其他 Android 工程使用的Jar包。

更多描述参见：[Setting up a Library Project](http://developer.android.com/tools/projects/projects-eclipse.html#SettingUpLibraryProject)

如果是自己创建的 Library工程，可以通过 [Referencing a library project](http://developer.android.com/tools/projects/projects-eclipse.html#ReferencingLibraryProject) 中介绍的方法来将 Library工程和 Android 关联。关联之后，在 Android  工程中就可以查看到 Library工程中的类源码及Java Doc。

# 生成 Library工程 java doc 的ANT脚本

在 Library工程的Home目录下创建一个 build_doc.xml 文件，内容如下：
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<project name="Test1" default="javadoc">
	<property name="path.lib" value="${basedir}/libs" />
	<property name="path.android" value="D:/Android/android-sdks" />

	<path id="path.depended">
		<!-- Add third-party jars in directory ./libs, if any -->
		<pathelement location="${path.lib}/xxx.jar" />

		<!-- Add jars for Android -->
		<pathelement location="${path.android}/platforms/android-7/android.jar" />
		<pathelement location="${path.android}/tools/support/annotations.jar" />
	</path>

	<target name="javadoc">
		<javadoc classpathref="path.depended" 
			sourcepath="src;gen" 
			encoding="UTF-8" charset="UTF-8" 
			destdir="docs" doctitle="Library"
			version="true"/>
	</target>

</project>
{% endhighlight %}

然后通过命令

<pre>
ant -f build_doc.xml
</pre>

来生成 java doc, 生成的内容存放在 docs 目录下。
