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

```
source 'https://gems.ruby-china.org/'
gem 'github-pages', group: :jekyll_plugins
```

然后执行以下命令安装 Jekyll 相关的组件

```
bundle install
```

然后就可以开始我们的Jekyll之旅了。

注意：Jekyll 和 都必须安装和 github 一样的版本，否则可能出现本地可以正常显示，但上传到 github 上后，github不更新的情况。

我就遇到过一次，在咨询 github 工作人员后才知道这一点。

为了确保与 GitHub 版本一致，可以通过以下命令对已经安装的 Jekyll 进行更新

{% highlight bash %}
bundle update
{% endhighlight %}


## 1.3 代码高亮

以前是使用 Pygments 来实现Blog中代码高亮。这需要安装 Python 等相关内容，比较复杂。

现在 GitHub 要求[使用 `rouge` 来实现代码高亮](https://help.github.com/articles/page-build-failed-config-file-error/#fixing-highlighting-errors) 。


### 1.3.1 配置 \_config.yaml文件

在 \_config.yaml 文件中增加
```
highlighter:      rouge
```
表示生成Blog页面时，使用 Pygments 来进行高亮显示。

### 1.3.2 使用
在 Blog 文件中将代码写在 highlight 和 endhighlight 之间，如：
<pre>
{{"{%"}} highlight html %}
   在这里写HTML代码片段
{{"{%"}} endhighlight %}
</pre>

除了html之外，还可以支持其它的语言，如: bash, java, python 等，参考：[List of supported languages and lexers][lexers]

## 1.4 启动 Jekyll

在 bash 窗口下执行以下命令启动Jekyll

```
bundle exec jekyll serve
```

如果启动时报错：

```
jekyll invalid byte sequence in GBK
```

则需要修改 .bashrc 文件， 添加以下内容

```
export LANG=en_US.UTF-8
```

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
* [List of supported languages and lexers][lexers]

[ujp]: https://help.github.com/articles/using-jekyll-with-pages
[lexers]: https://github.com/jneen/rouge/wiki/List-of-supported-languages-and-lexers

# 2 在 Bash on Ubuntu on Windows 下安装

Windows 10 提供了 Bash on Ubuntu on Windows，我们可以在该 Bash 下安装 Jekyll。

## 2.1 安装Ruby

如果系统中还没有 gcc 和 make ，则需要先安装。

```
sudo apt update
sudo apt-get install gcc make
```

安装完 gcc 和 make 后，执行如下命令安装 Ruby

```
sudo apt-add-repository ppa:brightbox/ruby-ng
sudo apt update
sudo apt install ruby2.3 ruby2.3-dev
```

## 2.2 安装 Bundler 及 Jekyll

### 2.2.1 安装 Bundler

执行以下命令

```
sudo gem install bundler
```

### 2.2.2 安装 Jekyll

在执行 “bundle install” 的过程中，编译nokogiri时会提示找不到 zlib.h，所以先安装 libz-dev。

```
sudo apt-get install libz-dev
```
再创建一个名为 Gemfile 的文本文件，文件的内容为

```
source 'https://gems.ruby-china.org/'
gem 'github-pages', group: :jekyll_plugins
```

然后执行以下命令安装 Jekyll 相关的组件

```
sudo bundle install
```

## 2.3 安装 nodejs

在运行 Jekyll 时，会提示没有 JavaScript 运行环境，并给出了一些可选项，我选择安装 nodejs。

```
sudo apt-get install nodejs
```

## 2.4 启动 Jekyll

执行以下命令启动Jekyll

```
bundle exec jekyll serve
```

注意：由于Windows提供的 Ubuntu 子系统还有一个Bug:  [Filesystem watchers like libinotify do not work](https://github.com/Microsoft/BashOnWindows/issues/216) ，所以启动命令需要增加一个参数。

```
bundle exec jekyll serve --no-watch
```

这意味着，如果修改了文件， Jekyll无法实时更新，只能通过重启 Jekyll 来查看更新后的效果。

> Note: Windows 10  Version 1703 （创意者更新）已经修改了该Bug。

## 2.5 参考资料

* [Setting up your GitHub Pages site locally with Jekyll](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)
* [Linux下安装jekyll](http://www.cnblogs.com/ee2213/p/3915243.html)
