---
layout: post
title: git常用命令说明
description:  记录我常用的git命令
categories: git
tags: git
copyright: cn
---

# 1. 配置git 

## 1.1设置全局参数

为了使用方便，需要设置全局的用户名、Email地址。
<pre>
git config --global user.name "Fan Hongtao"
git config --global user.email "fanhongtao@gmail.com"
</pre>

## 1.2 显示中文
msysgit 使用 ls 无法显示中文，可以在git安装目录下的 etc/git-completion.bash 中添加如下语句
<pre>
alias ls="ls --show-control-chars"
</pre>
也可以将上面的语句添加到 HOME 目录下的 .bashrc 文件中。

## 1.3 配置proxy
如果需要通过proxy才能访问网络，可以这样配置：
<pre>
git config --global  http.proxy  http://foo_proxy:80
</pre>

# 2. 仓库(repository)管理

## 2.1 创建纯仓库

<pre>
mkdir my_project.git
cd my_project.git
git init --bare
</pre>

## 2.2 Windows服务器上搭建git最小步骤

将一个包含.git目录的工作目录 my_project 克隆成为一个纯仓库, 然后将 my_project.git 目录拷贝到服务器上某个共享目录即可。
<pre>
git clone --bare  my_project  my_project.git
xcopy /e my_project.git  \\sharedir\my_project.git
</pre>


## 2.3 从服务器克隆git仓库

<pre>
git clone -b test1 git@gitserver:~git/my_project.git
</pre>

将服务器gitserver上git用户下my_project仓库中test1分支克隆到当前目录。

对于在windows共享目录上的git仓库，可以这样克隆
<pre>
git clone //sharedir/my_project.git
</pre>

## 2.4 将内容推到一个新的仓库

<pre>
git remote add origin git@gitserver:~git/new_project.git
git push origin master
</pre>

1. 为当前仓库关联一个远端的仓库，命名为“origin”，远端地址是 git@gitserver:~git/new_project.git
2. 将当前仓库（当前branch）的内容提交至origin的master分支

# 3 基本维护命令

<pre>
git diff                # 显示工作目录与本地仓库中内容的区别
git diff --staged       # 显示工作目录与索引的区别
git add xxx             # 将当前目录下的xxx文件添加到索引
git commit -m "desc"    # 将索引中的内容提交到本地仓库，提交的描述信息为 desc
</pre>

# 4 分支
# 4.1 创建本地分支
<pre>
git checkout -b iss53   # 创建一个名为iss53的分支，并将当前工作目录切换到iss53分支
</pre>

该命令等同于如下两条命令
<pre>
git branch iss53        # 创建一个名为iss53的分支
git checkout iss53      # 将工作目录切换到iss53分支
</pre>

# 4.2 分支合并
先切换到待合入的目标分支，再执行git merge
<pre>
git checkout master     # 切换到master分支
git merge hotfit        # 将hotfix分支上的内容合并到master分支
git branch -d hotfix    # 删除hotfix分支（因为内容已经在master上了）（可选步骤）
</pre>

对于合并时有冲突的文件，可以通过如下命令来启动编辑工作修改并合并冲突文件
<pre>
git mergetool filename
</pre>

# 4.3 分支管理
<pre>
git branch              # 列出所有分支，当前分支前有一个星号(*)
git branch -v           # 列出所有分支，及各分支最后一次commit信息
git branch --merged     # 列出已经与当前分支合并的分支
git branch --nomerged   # 列出还没有与当前分支合并的分支
</pre>

# 4.4 远程分支

命令格式： git push 远端仓库名  分支名[:远端分支名]
<pre>
git push origin master      # 取本地的master分支，更新到origin上的master分支
git push origin master:br1  # 取本地的master分支，更新到origin上的br1分支
git push origin :br1        # 删除远端的br1分支（命令的本意是取本地的空分支，更新br1）
</pre>

<pre>
git branch -r               # 查看有那些远端分支
git checkout --track [远端名]/[分支名]     # 将远端分支检出为本地分支，本地分支与远端分支名相同
git checkout -b [本地分支名] [远端名]/[分支名] # 将远端分支检出为本地分支，本地分支名由自己指定
</pre>

# 5 标签(Tags)

<pre>
git tag v1.5            # 创建一个名为v1.5的标签（在当前分支，当前已commit的内容）
git tag v1.2 gfceb02    # 为校验和为gfceb02的提交内容打标签
                        #   校验和只用写前几位，只要在仓库中不重复即可
</pre>


默认情况下，git push 并不会将标签推送到远端服务器上，需要显示使用命令来实现推送：
<pre>
git push origin v1.5    # 将名为v1.5的标签推送到服务器
git push origin --tags  # 将本地（新增）的标签全部推送到服务器
</pre>

