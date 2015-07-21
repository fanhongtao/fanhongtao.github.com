---
layout: post
title: msysgit 使用 svn 命令时遇到 Forbidden 错误
description:  在 msysgit 中如何下载路径中包含汉字的 SVN 库
categories: software
tags: [git]
copyright: cn
---

在 msysgit 中执行 

{% highlight bash %}
#!/bin/bash
git svn clone https://10.0.0.1/svn/2-代码/tags/tag1 
{% endhighlight %}

时，Git提示 403 Forbidden 错误。 

在网络上搜索，找到一篇有点关系的文章： 
[git svn clone gives RA layer request failed: PROPFIND - 403 Forbidden](https://groups.google.com/forum/?fromgroups=#!topic/msysgit/zW6tejRTN3I)

按其修改，没有结果。


考虑到 msysgit 对汉字支持得不好，再参考上一文章思路，觉得可能是是因为汉字的问题。所以修改 config 文件中的url地址， 

{% highlight cfg %}
[svn-remote "svn"] 
url = https://10.0.0.1/svn/2-代码/tags/tag1 
fetch = :refs/remotes/git-svn
{% endhighlight %}

修改后，再执行
{% highlight bash %}
git svn fetch 
{% endhighlight %}

，能够正常从SVN中下载。