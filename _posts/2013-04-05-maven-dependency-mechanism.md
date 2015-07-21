---
layout: post
title: Maven依赖机制
description:  Maven是如何引用第三方构件的？
categories: software
tags: [maven]
copyright: cn
---

* content
{:toc}

# 1. 依赖基本配置
当项目依赖于一个第三方Jar包时，需要在 pom.xml 文件中进行如下配置（以JUnit为例进行说明）：
{% highlight xml %}
<project ...>
   ......
    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>3.8.1</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    ......
</project>
{% endhighlight %}

在根元素 project 下面的 dependencies 配置所依赖的第三方构件。dependencies下可以配置一个或多个 dependency，每个dependency对应一个构件。

dependency的格式为：
{% highlight xml %}
<dependency>
    <groupId>...</groupId>
    <artifactId>...</artifactId>
    <version>...</version>
    <type>...</type>
    <scope>...</scope>
    <optional>...</optional>
    <exclusions>
        <exclusion>
        ...
        </exclusion>
        ...
    </exclusions>
</dependency>
{% endhighlight %}

* groupId, artifactId, version: 所依赖构件的坐标，参考：[Maven坐标](/2013/03/17/maven-coordinates.md)
* type: 依赖的类型，对应于构件坐标的packaging。缺省为 jar
* scope: 依赖的范围。
* optional: 是否是可选的依赖
* exclusions: 用于排除依赖

# 2. 传递性依赖（Transitive Dependencies）

This feature is facilitated by reading the project files of your dependencies from the remote repositories specified. In general, all dependencies of those projects are used in your project, as are any that the project inherits from its parents, or from its dependencies, and so on.

There is no limit to the number of levels that dependencies can be gathered from, and will only cause a problem if a cyclic dependency is discovered.

传递性依赖是指：Maven会读取所依赖工程（构件）在远端仓库上的工程文件（pom.xml），并将这些工程所依赖的工程，也作为当前工程的依赖。这一过程会一直持续下去，不受解析层级的限制。

举例说明：如果在工程A中配置依赖于B，B又依赖于C，C又依赖于D …… ，那么，Maven会将B、C、D …… 这些工程都作为A的依赖。

由于依赖的传递性，所以一个工程最终依赖的工程会变得很多。所以有必要对依赖的传递进行限制：

* 依赖仲裁（Dependency mediation）: 如果依赖传递过程中，遇到同一工程的不同的版本时如何解决冲突。
* 依赖范围（Dependency scope）： 只在特定的生命周期才引入依赖。
* 排除依赖（Excluded dependencies）：If project X depends on project Y, and project Y depends on project Z, the owner of project X can explicitly exclude project Z as a dependency, using the "exclusion" element.
* 可选依赖（Optional dependencies）：If project Y depends on project Z, the owner of project Y can mark project Z as an optional dependency, using the "optional" element. When project X depends on project Y, X will depend only on Y and not on Y's optional dependency Z. The owner of project X may then explicitly add a dependency on Z, at her option. (It may be helpful to think of optional dependencies as "excluded by default.")

# 3. 依赖仲裁

## 3.1 “最短路径”（nearest definition）

假设存在以下两个不同的依赖路径：

* A -> B -> C -> D 2.0 : A依赖于B，B又依赖于C、C又依赖于D的2.0版本。
* A -> E -> D 1.0 : A依赖于E，E又依赖于D的1.0版本。
根据依赖的传递性，A会同时依赖于D的1.0和2.0两个版本。这显然不合理。

Maven通过“最短路径”来解决此类冲突。在第一个依赖关系中，A到D的路径长度为3。第二个依赖关系中，A到D的路径长度为2。 所以Maven会选取第二个依赖中的D对应的版本作为最终的版本。即A依赖于D 1.0。

## 3.2 第一声明优先（the first declaration wins）

如果两个依赖路径的长度相同，但依赖的版本不同，如：

* A -> B -> D 2.0 
* A -> E -> D 1.0

则Maven会选择最先申明的依赖。如果A的依赖关系中，B出现在E前，则最后依赖于D 2.0。否则依赖于 D 1.0 。

# 4. 依赖范围

一个工程共涉及三套classpath: 编译时的classpath, 测试时的classpath 和 运行时的classpath。

依赖范围就是用来控制依赖与这三套classpath之间的关系。

共有6种依赖范围：

* compile : 缺省的范围。对编译、测试和运行的classpath都有效。
* provided : 对编译、测试classpath有效，运行classpath无效。如： Servlet API 这样的包（因为在J2EE容器中已经提供了）。
* runtime : 对测试和运行classpath有效，编译classpath无效。如： JDBC驱动（因为编译时只需要JDK中的JDBC接口）。
* test : 对测试classpath有效，编译和运行classpath无效。如：JUnit。
* system : 与provided的范围相同，但system指定的本地的，不在仓库中的包。仅适用于非常特殊的，不便于放到仓库中的包。 由于需要指定包在本地磁盘的存储路径，所以会导致pom.xml不具体通用性。建议避免使用。
* import : This scope is only used on a dependency of type pom in the <dependencyManagement> section. It indicates that the specified POM should be replaced with the dependencies in that POM's <dependencyManagement> section. Since they are replaced, dependencies with a scope of import do not actually participate in limiting the transitivity of a dependency.

Each of the scopes (except for import) affects transitive dependencies in different ways, as is demonstrated in the table below. If a dependency is set to the scope in the left column, transitive dependencies of that dependency with the scope across the top row will result in a dependency in the main project with the scope listed at the intersection. If no scope is listed, it means the dependency will be omitted.

<table width="100%">
    <thead>
        <tr><th width="20%"></th><th width="20%">compile</th><th width="20%">provided</th><th width="20%">runtime</th><th width="20%">test</th></tr>
    </thead>
    <tbody>
        <tr><td>compile</td><td>compile</td><td>-</td><td>runtime</td><td>-</td></tr>
        <tr><td>provided</td><td>provided</td><td>-</td><td>provided</td><td>-</td></tr>
        <tr><td>runtime</td><td>runtime</td><td>-</td><td>runtime</td><td>-</td></tr>
        <tr><td>test</td><td>test</td><td>-</td><td>test</td><td>-</td></tr>
    </tbody>
</table>


# 参考
* [Introduction to the Dependency Mechanism](http://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html)
