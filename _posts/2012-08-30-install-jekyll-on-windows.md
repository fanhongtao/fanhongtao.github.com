---
layout: post
title: 在Windows下安装Jekyll
description: 记录我的安装过程。
categories: jekyll
key: Jekyll, Windows
copyright: cn
---

# 1. 安装Ruby

1. 从 [http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/) 下载最新的Ruby版本： [rubyinstaller-1.9.3-p194.exe](http://files.rubyforge.vm.bytemark.co.uk/rubyinstaller/rubyinstaller-1.9.3-p194.exe)
和 [DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe](https://github.com/downloads/oneclick/rubyinstaller/DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe)
2. 执行 rubyinstaller-1.9.3-p194.exe， 假设安装在 c:\ruby193 目录， 安装时需要选择"Add Ruby executables to your PATH"
3. 执行 DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe， 设置解压目录为 c:\RubyDevKit
4. 进入 c:\RubyDevKit 目录，执行 ruby dk.rb init 和 ruby dk.rb install

# 2. 安装Jekyll

在bash窗口下执行

{% highlight bash %}
gem install jekyll -v 0.11.0
gem install liquid -v 2.2.2
gem install rdiscount kramdown
{% endhighlight %}

然后就可以开始我们的Jekyll之旅了。

注意：Jekyll 和 都必须安装和 github 一样的版本，否则可能出现本地可以正常显示，但上传到 github 上后，github不更新的情况。

我就遇到过一次，在咨询 github 工作人员后才知道这一点。

上面命令中的版本是我写本文时 github 所使用的版本。github所使用的版本情况可以在 [Using Jekyll with Pages][ujp] 中查看。

通过 <code>gem list</code> 查看本地安装的版本，如果已经安装了其它版本的 jekyll 或 liquid, 可以通过如下命令删除

{% highlight bash %}
gem uninstall jekyll
gem uninstall liquid
{% endhighlight %}

删除时，可以通过 -v 参数指定所要删除的版本号。

如果不删除，会出现诸如

<pre>
 Liquid error: undefined method `join' for ...
</pre>

这样的错误。

# 3. 安装 Pygments 

安装 Pygments 是为了在Blog中能够实现代码高亮。如果不需要在Blog中写代码片段，可以不用安装 Pygments, 跳过本章节。

## 3.1 安装
1. 安装Python: 从 [Phthon网站](http://www.python.org/getit/)下载并安装 [python-2.7.3.msi](http://www.python.org/ftp/python/2.7.3/python-2.7.3.msi) （或更高版本的 python-2.x.x）, 假设安装在 c:\Python27 目录
2. 安装easy_install: 从[http://pypi.python.org/pypi](http://pypi.python.org/pypi)下载并安装 [setuptools-0.6c11.win32-py2.7.exe](http://pypi.python.org/packages/2.7/s/setuptools/setuptools-0.6c11.win32-py2.7.exe#md5=57e1e64f6b7c7f1d2eddfc9746bbaf20)
3. 安装 Pygments: 执行下命令
{% highlight bat %}
cd c:\Python27\Scripts\
easy_install Pygments
{% endhighlight %}

最后再将 c:\Python27\Scripts\ 添加到环境变量 PATH 中。

## 3.2. 打补丁

参考下面的链接为Ruby打补丁，防止出现“Liquid error: bad file descriptor”错误。

* [https://gist.github.com/1185645](https://gist.github.com/1185645)

也可以直接下载我修改后的文件 [albino.rb](/attachments/albino.rb) 。注意：使用“另存为”来下载。


## 3.3 生成 css 文件

为了在博客中使用Pygments， 还需要生成相应的 css文件，在Jekyll工程目录下执行；
<pre>
pygmentize -S default -f html > css/pygments.css
</pre>
即：使用缺省的配色方案，将生成的文件 pygments.css 存放在 css 目录下。

同时，还需要修改 layout 目录下的 default.html ，在 head 标签内部增加一行

{% highlight html %}
<link rel="stylesheet" href="/css/pygments.css" type="text/css" />
{% endhighlight %}

## 3.4 配置 _config.yaml文件
在 _config.yaml 文件中增加 
<pre>
pygments: true 
</pre>
表示生成Blog页面时，需要使用到Pygments

## 3.5 使用
在 Blog 文件中将代码写在 highlight 和 endhighlight 之间，如：
<pre>
{ % highlight html %}
在这里写HTML代码片段
{ % endhighlight %}
</pre>
注意：使用时需要删除 { 和 % 之间的空格。

除了html之外，还可以支持其它的语言，如: bash, java, python 等，参考：[Available lexers][lexers]

# 4. 启动 Jekyll

在 bash 窗口下执行以下命令启动Jekyll

<pre>
jekyll --server 
</pre>

如果启动时报错：

<pre>
jekyll invalid byte sequence in GBK
</pre>

则需要修改 .bashrc 文件， 添加以下内容

<pre>
export LANG=en_US.UTF-8
</pre>

# 5. 参考资料

## 5.1 安装参考

* [Development Kit](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)
* [使用Jekyll在Github上搭建博客](http://taberh.me/2011/12/26/use-Jekyll-build-Blog-on-Github.html)
* [像黑客一样写博客——Jekyll入门](http://www.soimort.org/tech-blog/2011/11/19/introduction-to-jekyll_zh.html)
* [How to use GitHub Pages on Windows](http://bradleygrainger.com/2011/09/07/how-to-use-github-pages-on-windows.html)
* [Using Jekyll with Pages][ujp]
* [Static blogging the Jekyll way](http://recursive-design.com/blog/2010/10/12/static-blogging-the-jekyll-way/)
* [How to get Pygments to work with Jekyll](http://www.stehem.net/2012/02/14/how-to-get-pygments-to-work-with-jekyll.html)

## 5.2 写作时参考

可以使用[MarkdownPad](http://markdownpad.com/download/)来编写文本

* [YMAL语法](http://www.yaml.org) , [V1.2版本](http://www.yaml.org/spec/1.2/spec.html)
* [Markdown: Syntax](http://daringfireball.net/projects/markdown/syntax)
* [Markdown语法说明](http://wowubuntu.com/markdown/)
* [Available lexers][lexers]


[ujp]: https://help.github.com/articles/using-jekyll-with-pages
[lexers]: http://pygments.org/docs/lexers/