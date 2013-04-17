---
layout: post
title: 给Android工程添加第三方库的JavaDoc
categories: android
tags: [android, eclipse]
copyright: cn
---

# 有源码的第三方库

对于有源码的第三方库，可以通过 [How to attach javadoc or sources to jars in libs folder?](http://stackoverflow.com/questions/9873152/how-to-attach-javadoc-or-sources-to-jars-in-libs-folder#11579339)
中介绍的方法来实现绑定。

创建一个 <i>.properties<i>文件，在该文件中指明源码和JavaDoc的路径。

如：想关联 gson-2.2.2.jar 的源码和JavaDoc，需要创建一个名为 gson-2.2.2.jar.properties 的文件，其内容为：
<pre>
src=src/gson-2.2.2-sources.jar
doc=docs/gson-2.2.2-javadoc.jar
</pre>

可以配置相对路径，也可以配置绝对路径。

# 没有源码的第三方库 

对于没有源码，只有javadoc的第三方库 或 [Library工程](/2013/04/17/android-library-project.html) 的库，也可以采用上面的办法。

根据我的测试，需要注意以下事项：

1. 不能使用 -javadoc.jar 或 -javadoc.zip，必须将其解压。
2. 不能使用 JDK 7生成Java Doc，只能使用JDK 6（低版本可能也行，我没有测试）。

如果不遵循以上注意事项，Eclipse会找不到对应的文件。

