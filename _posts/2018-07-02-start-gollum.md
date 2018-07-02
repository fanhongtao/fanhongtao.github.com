---
layout: post
title: 启动 gollum
description: 在 Ubuntu 和 Windows 10 Ubuntu 子系统下启动 gollum
categories: software
tags: [gollum]
copyright: cn
---

# 0 安装

Ubuntu下使用如下命令安装 gollum
```
sudo gem install gollum
```

安装过程中可能会出错，还需要相关的软件，根据出错提示进行相应安装。我遇到的问题是需要安装如下软件
```
sudo apt-get install ruby-dev
sudo apt-get install libicu-dev
```

安装完成后，为了让 gollum 支持 GitHub 的 Markdown 格式（如：表格），还需要执行：
```
sudo gem install github-markdown
```

# 1 在 Ubuntu 下启动

通常是将其配置为开机自启动。

## 1.1 start_wiki.sh

在 `/etc/init.d` 目录下，创建 start_wiki.sh ，内容为

```
#!/bin/bash
### BEGIN INIT INFO
# Provides:          wiki
# Required-Start:    $local_fs $network
# Required-Stop:     $local_fs
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: wiki
# Description:       My wiki fot study & life.
### END INIT INFO


cd ~fht/wiki
gollum --mathjax &

exit 0
```

这里的 ~fht/wiki 是 wiki 对应的 git 目录（用户 fht 下的 wiki 目录）。

然后将其赋予 755 权限：

```
chmod 755 start_wiki.sh
```

## 1.2 设置为开机启动

执行命令：

```
sudo update-rc.d start_wiki.sh defaults 90
```

如果想将其从开机启动中删除，则执行命令：

```
sudo update-rc.d -f start_wiki.sh remove
```

# 2 在 Windows 10 的 Ubuntu 子系统下启动

原本想也将其配置为开机自启动，结果没有成功。尝试过：

* 和 Ubuntu 系统一样，加入 `/etc/init.d` 目录。
* 参考过 [ubuntu子系统及子系统中服务一起随windows系统开机自启动和开启ssh登录使用xshell登录](http://bbs.pcbeta.com/viewthread-1771348-1-1.html) 的方法：“.vbs 文件” 加 “windows计划任务管理”。


## 2.1 wiki.bat 文件

先创建一个 wiki.bat 文件

```
bash ~/start_wiki.sh  /mnt/d/fht/wiki
```

其中 “/mnt/d/fht/wiki” 是 wiki 对应的 git 目录加 Ubuntu 下在路径， windows 对应目录是 D:\fht\wiki 。

## 2.1 start_wiki.sh

在 Ubuntu 子系统的用户目录下创建文件 start_wiki.sh，内容为

```
#!/bin/bash

wiki_path=$1

count=`ps -ef | grep gollum | grep $wiki_path | wc | gawk '{print $1}'`
if [ $count -ne 0 ]; then
    echo "Wiki [$wiki_path] already started."
    exit 0
fi

cd $wiki_path
nohup gollum --mathjax $wiki_path &

exit 0
```

其中， wiki_path 是传入的参数，也就是 BAT 文件中写的 /mnt/d/fht/wiki

接受传入参数是考虑到，可能会启动多个不同目录下的 Wiki 。

## 2.3 启动

执行 BAT 即可。

