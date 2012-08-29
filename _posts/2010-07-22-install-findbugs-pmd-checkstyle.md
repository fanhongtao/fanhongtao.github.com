---
layout: post
title: Eclipse中使用Link方式安装静态检查插件
description:  包括：CheckStyle、FindBugs 和 PMD插件
categories: eclipse
tags: [Eclipse, CheckStyle, FindBugs, PMD]
copyright: cn
---

## 1 现状
写的Java代码需要使用 CheckStyle、FindBugs 和 PMD 进行静态检查。而大多数开发人员都使用Eclipse进行开发，所以最好的办法是使用这三个工具的Eclipse插件。

如果直接将这三个Eclipse插件安装在Eclipse版本中，如果需要升级Eclipse，或者根据开发需要，有可能使用两种Eclipse（For EE版本和For RCP版本），就又需要重新再按照安装手册操作一次，很不方便。

## 2 解决方案
Eclipse提供了Link方式安装插件的功能，通过将插件和Eclipse版本分开部属，可以方便后期 Eclipse 和 插件单独升级。

### 2.1 一般方法
下面介绍我个人的习惯做法：

1. 在 D: 盘创建一个eclipse目录，（D:\eclipse），所有和Eclipse相关的东西全部都放在该目录下。
2. 将一个需要使用的Eclipse安装包在 D:\eclipse 目录下解压，形成 D:\eclipse\eclipse 目录
3. 考虑到可能同时使用多个版本的Eclipse，所以需要在目录上体现出Eclipse的版本，将解压得到的 eclipse子目录修改为Eclipse安装包的名字，如改名为 D:\eclipse\eclipse-jee-helios-win32
4. 在 D:\eclipse 目录下创建一个 eclipse_plugins 的子目录（D:\eclipse\eclipse_plugins\）
5. 在 D:\eclipse\eclipse_plugins\ 目录下为每个需要安装的插件创建一个子目录，子目录以插件名加版本号进行命名，如：checkstyle_4.4.2
6. 进入  D:\eclipse\eclipse_plugins\checkstyle_4.4.2 目录，将对应的插件在此目录下解压。解压时需要注意，如果插件打包时有 eclipse 目录，则解压后就可以直接使用，否则需要先创建 eclipse 子目录，然后将解压的内容放在 eclipse子目录下。以 checkstyle 为例，最后得到的目录为 D:\eclipse\eclipse_plugins\checkstyle_4.4.2\eclipse\features\ 和 D:\eclipse\eclipse_plugins\checkstyle_4.4.2\eclipse\plugins\ 目录。
7. 在 D:\eclipse\eclipse-jee-helios-win32 目录下创建一个 links 目录
8. 在 D:\eclipse\eclipse-jee-helios-win32\links 目录下创建一个文本文件 checkstyle_4.4.2.link，内容为 path=D:/eclipse/eclipse_plugins/checkstyle_4.4.2
9. 启动 Eclipse 应该就可以看到插件已经生效。如果没有生效，可以使用增加启动参数 -clean 的方式再重试一次。

### 2.2 说明

1. 为每个Eclipse安装包和每个插件都单独创建一个目录，并且目录名中都带版本号，方便后期管理
2. links 目录下的文件可以任意命名，如：checkstyle.txt ，但我认为以 “插件名_插件版本号.link”的命名方式更好理解
3. links目录下可以有多个文件，每个文件中的内容都会生效。每个文件中可以有多个 "path="行。
4. 如果不想使用某个插件，可以将对应的 .link 文件移出 links 目录，再重启 Eclipse。（所以还是每个文件一行比较好管理）

## 3 安装插件
### 3.1 CheckStyle插件
除了按照一般的操作步骤安装完成之后，还可以再进一步：将项目组统一的配置项 checkstyle_ruleset_xxx.xml 作为该插件的首选项。

操作方法如下：

1. 进入 D:\eclipse\eclipse_plugins\checkstyle_4.4.2\eclipse\plugins\com.atlassw.tools.eclipse.checkstyle_4.4.2  目录；
2. 将 checkstyle_ruleset_xxx.xml 文件拷贝至该目录；
3. 修改该目录下的 plugin.xml 文件

修改前： 

{% highlight xml %}
<extension
     id="checkstyle.CheckConfiguration"
     point="com.atlassw.tools.eclipse.checkstyle.configurations">
    <check-configuration
        name="Sun Checks"
        location="sun_checks.xml"
        description="%SunChecks.description"/>
    <check-configuration
        name="Sun Checks (Eclipse)"
        location="sun_checks_eclipse.xml"
        description="%SunChecksEclipse.description"/>
</extension>
{% endhighlight %}

修改后
{% highlight xml %}
<extension
     id="checkstyle.CheckConfiguration"
     point="com.atlassw.tools.eclipse.checkstyle.configurations">
    <check-configuration
        name="Common Checks of Group xxx"
        location="checkstyle_ruleset_xxx.xml"
        description="V1.x(2010-01-01)"/>
    <check-configuration
        name="Sun Checks"
        location="sun_checks.xml"
        description="%SunChecks.description"/>
    <check-configuration
        name="Sun Checks (Eclipse)"
        location="sun_checks_eclipse.xml"
        description="%SunChecksEclipse.description"/>
</extension>
{% endhighlight %}

将项目组统一的配置文件放作为第一个 check-configuration ，这样，该 check-configuration 就被认为是缺省的 check-configuration。

### 3.2 FindBugs插件

FindBugs 的插件安装包没有 plugins目录，所以需要自己先创建 eclipse\plugins 目录，然后再将安装包中的内容解压到 eclipse\plugins 目录下。

安装完成后，需要使用指定的 findbugs.xml 替换 D:\eclipse\eclipse_plugins\FindBugs_1.3.9\eclipse\plugins\edu.umd.cs.findbugs.plugin.eclipse_1.3.9.20090821 目录下 findbugs.jar 中的同名文件。

### 3.3 PMD插件

PMD 插件解压后，没有办法直接使用，还需要手将一些 jar 文件进行二次解压。

进入 D:\eclipse\eclipse_plugins\pmd_4.2.4\eclipse\features，将 net.sourceforge.pmd.eclipse_3.2.4.v200804111600.jar 解压，得到  net.sourceforge.pmd.eclipse_3.2.4.v200804111600 目录，

同样的，进入 D:\eclipse\eclipse_plugins\pmd_4.2.4\eclipse\plugins 目录，解压 net.sourceforge.pmd.core_4.2.1.v200804111600.jar 、net.sourceforge.pmd.runtime_3.2.4.v200804111600.jar 和 net.sourceforge.pmd.ui_3.2.4.v200804111600.jar 三个文件。

由于没有找到在PMD插件中直接修改规则的方法，所以使用时，还需要手工导入PMD的规则文件。
