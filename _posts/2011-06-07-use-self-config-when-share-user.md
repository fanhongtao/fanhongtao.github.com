---
layout: post
title: 共用Linux用户时使用自己的配置
description:  在与他人共用一个Linux用户时，如何使用自己的环境变量
categories: software
tags: [linux]
copyright: cn
---

由于开发环境紧张，需要与其他人共用一个Linux用户。而该用户的缺省设置又与自己的使用习惯不一致。此时就需要通过一些小技巧来达到尽量不影响原用户的情况下，让配置与自己的习惯相同。 

共用开发环境时，通常的作法是在用户的HOME目录下创建一个自己的目录，然后将自己所有的数据都放在该目录下。这样可以根据目录区分不同的实际用户。当不再共用环境时，只需要删除自己的目录即可。 

除了使用自己的环境变量、快捷方式之外，Vim是我常用的工具，有着自己的习惯配置项，所以在共用用户时，也需要将vim的配置项修改成自己的。 

下文将假设已经在 ${HOME} 目录下创建了一个名为 “fht”的目录 。 

修改 ~/.bashrc 文件，在其中增加一个alias 

{% highlight bash %}
alias fht='source ~/fht/.bashrc'
{% endhighlight %}

在 fht 目录下，创建 .bashrc 文件，里面写有自己的配置项，如： 

{% highlight bash %}
# 设置自己的HOME目录，方便后继使用
export MY_HOME=~/fht
export PATH=.:${PATH}

# 为了使用自己的VIM配置而增加的两个配置项
export MYVIMRC='${MY_HOME}/.vimrc'
export VIMINIT='source $MYVIMRC'

# 定义自己的快捷方式
alias ll='ls -l'
alias froyo='cd ~/${MY_HOME}/src/froyo'
# …… 其它定义
{% endhighlight %}

通过这样的配置，当使用共用的用户名登录后，执行命令"fht"，就可以将当前的配置修改成自己的配置项。如果不执行“fht”命令，则会保留原用户的配置不变。 

在 fht 目录下，创建 .vimrc 文件，里面写有自己的VIM配置项，如： 

{% highlight vim %}
colorscheme torte
let mapleader=","
nmap <silent> ,/ :nohlsearch<CR>
" …… 其它定义
{% endhighlight %}