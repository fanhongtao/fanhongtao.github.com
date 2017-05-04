---
layout: post
title: 在Windows下安装Jekyll
description: 记录我的安装过程。
categories: software
tags: jekyll
copyright: cn
---

* content
{:toc}

# 1 传统Windows下安装

## 1.1 安装Ruby

1. 在 [https://pages.github.com/versions/](https://pages.github.com/versions/) 查看所需要的Ruby版本，然后从 [http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/) 下载相应的 Ruby 及与之匹配的 Development Kit 。当前对应的版本是 [rubyinstaller-2.1.6-x64.exe](http://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.1.6-x64.exe)
和 [DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe](http://dl.bintray.com/oneclick/rubyinstaller/DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe)
2. 执行 rubyinstaller-2.1.6-x64.exe， 假设安装在 c:\Ruby21-x64 目录， 安装时需要选择"Add Ruby executables to your PATH"
3. 执行 DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe， 设置解压目录为 c:\RubyDevKit
4. 进入 c:\RubyDevKit 目录，执行以下两条命令
{% highlight bash %}
ruby dk.rb init
ruby dk.rb install
{% endhighlight %}

## 1.2 安装 Bundler 及 Jekyll

### 1.2.1 安装 Bundler

先在bash窗口下执行以下命令来安装 Bundler 。
{% highlight bash %}
gem install bundler
{% endhighlight %}

由于国内网络访问的问题，该命令无法执行成功，提示

<pre>
fht@FHT-THINK /c/Ruby21-x64
$ gem install bundler -v 1.10.5
ERROR:  Could not find a valid gem 'bundler' (= 1.10.5), here is why:
          Unable to download data from https://rubygems.org/ - Errno::ECONNRESET
: An existing connection was forcibly closed by the remote host. - SSL_connect (
https://api.rubygems.org/quick/Marshal.4.8/bundler-1.10.5.gemspec.rz)
ERROR:  Possible alternatives: bundler

fht@FHT-THINK /c/Ruby21-x64
$ gem install bundler -v 1.10.5
ERROR:  Could not find a valid gem 'bundler' (= 1.10.5), here is why:
          Unable to download data from https://rubygems.org/ - Errno::ETIMEDOUT:
 A connection attempt failed because the connected party did not properly respon
d after a period of time, or established connection failed because connected hos
t has failed to respond. - connect(2) for "s3.amazonaws.com" port 443 (https://a
pi.rubygems.org/specs.4.8.gz)

</pre>

除了考虑翻墙之外，还可以通过将 source 指向国内的网址来实现下载。
 
<pre>
fht@FHT-THINK /c/Ruby21-x64
$ gem source
*** CURRENT SOURCES ***

https://rubygems.org/

fht@FHT-THINK /c/Ruby21-x64
$ gem sources --remove https://rubygems.org/
https://rubygems.org/ removed from sources

fht@FHT-THINK /c/Ruby21-x64
$ gem sources -a http://ruby.taobao.org/
http://ruby.taobao.org/ added to sources
</pre>

上面的命令集中，先查看当前已有的 source，然后删除国外的网址，最后指定为国内的网址。

### 1.2.2 安装 Jekyll

创建一个名为 Gemfile 的文本文件，文件的内容为

<pre>
source 'http://ruby.taobao.org/'
gem 'github-pages'
</pre>

然后执行以下命令安装 Jekyll 相关的组件

<pre>
bundle install
</pre>

然后就可以开始我们的Jekyll之旅了。

注意：Jekyll 和 都必须安装和 github 一样的版本，否则可能出现本地可以正常显示，但上传到 github 上后，github不更新的情况。

我就遇到过一次，在咨询 github 工作人员后才知道这一点。

为了确保与 GitHub 版本一致，可以通过以下命令对已经安装的 Jekyll 进行更新

{% highlight bash %}
bundle update
{% endhighlight %}


## 1.3 安装 Pygments 

安装 Pygments 是为了在Blog中能够实现代码高亮。如果不需要在Blog中写代码片段，可以不用安装 Pygments, 跳过本章节。

### 1.3.1 安装
1. 安装Python: 从 [Phthon网站](http://www.python.org/getit/)下载并安装 [python-2.7.3.msi](http://www.python.org/ftp/python/2.7.3/python-2.7.3.msi) （或更高版本的 python-2.x.x）, 假设安装在 c:\Python27 目录
2. 安装easy_install: 从[http://pypi.python.org/pypi](http://pypi.python.org/pypi)下载并安装 [setuptools-0.6c11.win32-py2.7.exe](http://pypi.python.org/packages/2.7/s/setuptools/setuptools-0.6c11.win32-py2.7.exe#md5=57e1e64f6b7c7f1d2eddfc9746bbaf20)
3. 安装 Pygments: 执行下命令
{% highlight bat %}
cd c:\Python27\Scripts\
easy_install Pygments
{% endhighlight %}

最后再将 c:\Python27\Scripts\ 添加到环境变量 PATH 中。

### 1.3.2 打补丁

参考下面的链接为Ruby打补丁，防止出现“Liquid error: bad file descriptor”错误。

* [https://gist.github.com/1185645](https://gist.github.com/1185645)

也可以直接下载我修改后的文件 [albino.rb](/attachments/albino.rb) 。注意：使用“另存为”来下载。


### 1.3.3 生成 css 文件

为了在博客中使用Pygments， 还需要生成相应的 css文件，在Jekyll工程目录下执行；
<pre>
pygmentize -S default -f html > css/pygments.css
</pre>
即：使用缺省的配色方案，将生成的文件 pygments.css 存放在 css 目录下。

同时，还需要修改 layout 目录下的 default.html ，在 head 标签内部增加一行

{% highlight html %}
<link rel="stylesheet" href="/css/pygments.css" type="text/css" />
{% endhighlight %}

### 1.3.4 配置 _config.yaml文件
在 _config.yaml 文件中增加 
<pre>
highlighter:      pygments
</pre>
表示生成Blog页面时，使用 Pygments 来进行高亮显示。

### 1.3.5 使用
在 Blog 文件中将代码写在 highlight 和 endhighlight 之间，如：
<pre>
{{"{%"}} highlight html %}
   在这里写HTML代码片段
{{"{%"}} endhighlight %}
</pre>

除了html之外，还可以支持其它的语言，如: bash, java, python 等，参考：[Available lexers][lexers]

## 1.4 启动 Jekyll

在 bash 窗口下执行以下命令启动Jekyll

<pre>
bundle exec jekyll serve
</pre>

如果启动时报错：

<pre>
jekyll invalid byte sequence in GBK
</pre>

则需要修改 .bashrc 文件， 添加以下内容

<pre>
export LANG=en_US.UTF-8
</pre>

## 1.5 参考资料

### 1.5.1 安装参考

* [Development Kit](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)
* [How to use GitHub Pages on Windows](http://bradleygrainger.com/2011/09/07/how-to-use-github-pages-on-windows.html)
* [Using Jekyll with Pages][ujp]
* [Static blogging the Jekyll way](http://recursive-design.com/blog/2010/10/12/static-blogging-the-jekyll-way/)

### 1.5.2 写作时参考

可以使用[MarkdownPad](http://markdownpad.com/download/)来编写文本

* [YMAL语法](http://www.yaml.org) , [V1.2版本](http://www.yaml.org/spec/1.2/spec.html)
* [Markdown: Syntax](http://daringfireball.net/projects/markdown/syntax)
* [Markdown语法说明](http://wowubuntu.com/markdown/)
* [Available lexers][lexers]

[ujp]: https://help.github.com/articles/using-jekyll-with-pages
[lexers]: http://pygments.org/docs/lexers/

# 2 在 Bash on Ubuntu on Windows 下安装

Windows 10 提供了 Bash on Ubuntu on Windows，我们可以在该 Bash 下安装 Jekyll。

## 2.1 安装Ruby

如果系统中还没有 gcc 和 make ，则需要先安装。

<pre>
sudo apt update
sudo apt-get install gcc make
</pre>

安装完 gcc 和 make 后，执行如下命令安装 Ruby

<pre>
sudo apt-add-repository ppa:brightbox/ruby-ng
sudo apt update
sudo apt install ruby2.3 ruby2.3-dev
</pre>

## 2.2 安装 Bundler 及 Jekyll

### 2.2.1 安装 Bundler

执行以下命令

<pre>
sudo gem install bundler
</pre>

### 2.2.2 安装 Jekyll

在执行 “bundle install” 的过程中，编译nokogiri时会提示找不到 zlib.h，所以先安装 libz-dev。

<pre>
sudo apt-get install libz-dev
</pre>

再创建一个名为 Gemfile 的文本文件，文件的内容为

<pre>
source 'https://gems.ruby-china.org/'
gem 'github-pages', group: :jekyll_plugins
</pre>

然后执行以下命令安装 Jekyll 相关的组件

<pre>
sudo bundle install
</pre>

## 2.3 安装 Pygments

执行下命令

<pre>
sudo apt-get install python-setuptools
sudo easy_install Pygments
</pre>

## 2.4 安装 nodejs

在运行 Jekyll 时，会提示没有 JavaScript 运行环境，并给出了一些可选项，我选择安装 nodejs。

<pre>
sudo apt-get install nodejs
</pre>

## 2.5 启动 Jekyll

执行以下命令启动Jekyll

<pre>
bundle exec jekyll serve
</pre>

注意：由于Windows提供的 Ubuntu 子系统还有一个Bug:  [Filesystem watchers like libinotify do not work](https://github.com/Microsoft/BashOnWindows/issues/216) ，所以启动命令需要增加一个参数。

<pre>
bundle exec jekyll serve --no-watch
</pre>

这意味着，如果修改了文件， Jekyll无法实时更新，只能通过重启 Jekyll 来查看更新后的效果。

## 2.6 参考资料

* [Setting up your GitHub Pages site locally with Jekyll](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)
* [Linux下安装jekyll](http://www.cnblogs.com/ee2213/p/3915243.html)
