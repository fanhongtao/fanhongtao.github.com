---
layout: post
title: 安装Linux
description:  如何在笔记本上安装Linux
categories: [computer]
tags: [linux]
copyright: cn
---

# 1. Ubuntu

为了将我的老华硕 Eee PC 利用起来，决定为其安装 Ubuntu 。之所以选择 Ubuntu，是因为之前在搞开发时，用过一段时间该系统，有着一种惯性。

因为 Eee PC 只支持32位操作系统，所以从 [Ubuntu官网](https://ubuntu.com/download/alternative-downloads) 下载 “Ubuntu 16.04.6 Desktop (32-bit)” 版本。 得到文件： ubuntu-16.04.6-desktop-i386.iso，文件大小：1.56 GB 。

使用 [Rufus](https://rufus.ie/) 或 [UltraISO](https://cn.ultraiso.net/) 将下载的 ISO 文件写入U盘。

我在百度是搜索的Ubuntu安装指导文章，提到的都是 UltraISO，所以我也花了￥30 注册了 UltraISO，成功安装了Ubuntu。但后来找到 《[Create a bootable USB stick on Windows](https://tutorials.ubuntu.com/tutorial/tutorial-create-a-usb-stick-on-windows)》，发现文章中是使用 Rufus 来制作安装盘，于是又使用 Rufus 重新安装了一次。实践证明，单就制作 Ubuntu 安装U盘这一功能，两者是一样的。所以 **推荐使用 Rufus** 。

先下载 Rufus 3.5 Portable 版本（就一个免安装的 exe 文件）。

安装步骤如下：

1. 将一个大于2G的U盘插入 Window 电脑
2. 启动 Rufus
3. 在Rufus中点击“选择”按钮，选择之前下载的文件“ubuntu-16.04.6-desktop-i386.iso”
4. 检查“设备”项是否是待写入的U盘，如果不是，则选择正确的U盘
5. 点击“开始”，将ISO写入U盘
6. 将U盘插入待安装的电脑，通过设置 BIOS，让电脑使用U盘启动
7. 按照界面提示逐步安装（第一个界面中，先将语言选择成“中文（简体）”）。


# 2. Bodhi Linux

《[不容错过的 5 个微型 Linux 发行版](https://linux.cn/article-11040-1.html)》中，介绍了 Bodhi Linux。我选择 Bodhi 是觉得 Ubuntu 有些笨重，特别是针对我的 Eee PC 而言。所以想寻找一个轻便些的版本。选 Bodhi 是考虑到它基于 Ubuntu 开发，切换起来方便一些。

## 2.1 安装 Bodhi Linux

因为是32位机，所以从 [Bodhi Linux官网](https://www.bodhilinux.com/download/) 下载 “Legacy Release”，得到文件 bodhi-5.0.0-legacy.iso ，文件大小：725 MB。

安装步骤与 Ubuntu 类似，这里讲一点不一样的地方：

1. 必须使用 [Etcher](https://www.balena.io/etcher/) 来写 U盘。Rufus 和 UltraISO 都不好使。
2. 使用U盘在等安装电脑上启动后，并不是立刻进入 Bodhi 的安装界面，而是以 Live 模式启动 Bodhi 。由于该模式不能保存数据，仅供体验，所以需要手工来启动安装。在开始菜单中依次选择： Applications -> Preferences-> Install Bodhi Linux 5.0.0 Legacy

由于之前已经安装了 Ubuntu，所以在安装 Bodhi 时，我选择了保留 Ubuntu，让系统变成双操作系统。

## 2.2 添加中文输入法

Bodhi 是 Ubuntu 的简化版本，它并没有提供汉字输入法，所以在安装完成后，还需要手工添加输入法，步骤如下：

1. 为了和 Ubuntu 保持快捷键一致，先删除现有的快捷键“Win + Space”。开始菜单中依次选择： Settings -> Setting Panel，打开设置界面。选择“Input”中的“Key Bindings”，找到“WIN + Space”，点击“Delete”。
2. 开始菜单中依次选择： Applications -> System Tools -> Teminology ，打开**终端**。
3. 在**终端**中输入命令 `sudo apt-get install ibus-pinyin` ，安装 拼音输入法。
4. 在**终端**中输入命令 `im-config` ，在界面中选择“ibus   activate Intelligent Input Bus(IBus)@” 项，并点击“OK”
5. 在**终端**中输入命令 `ibus-setup` ，在“Input Method”页中，点击“Add”，再选择“Chinese”，选择“Pinyin”。
6. 重启界面。 点击屏幕右下角的像电源的按钮，选择“Log Out”
7. 重新登录后，先通过 “Win + Space” 选择拼音输入法，再打开 Midori 浏览器，在“地址”框中输入汉字。

如果需要使用五笔输入法，则需要执行命令： `sudo apt-get install ibus-table-wubi` 。执行命令后，需要重启界面，然后在 ibus-setup 界面中进行选择，系统中有“海峰五笔”和“极点五笔”两种供选择。

> 注意，不要在 Bodhi 自带的**终端** 和 ePad 中输入中文，个人感觉这两个程序好像不支持 ibus。刚开始没有意识到这一点，以为输入法没有安装好，倒腾了很长时间，无意中在 Midori 浏览器中输入，才发现可能是这两个程序的问题。

## 2.3 其它常用软件

安装常用的软件：

* 文本输入 gedit: `sudo apt-get install gedit`
* Libre Office: `sudo apt-get install libreoffice`


# 3. Puppy Linux

与 Bodhi 不同，Puppy Linux 可以在U盘上启动、运行。 特别适用于：借用他人的电脑，但基于安全、隐私等考虑，又不想用电脑中的系统。

## 3.1 制作 Puppy Linux U盘

从 [Puppy Linux 官网](http://puppylinux.com/index.html#download)下载 BionicPup32 8.0，得到文件 bionicpup32-8.0-uefi.iso，文件大小：273 MB。

使用 Rufus 将下载的ISO写入U盘。

（UltraISO 写入的U盘无法启动。 Etcher 写入的U盘因为分区问题，会导致无法将 Pupsave 保存在U盘，故也不合适）

将 U盘插入任意一个电脑，使用U盘启动方式启动，就进入了 Puppy Linux ，这时就可以正常使用了，如：浏览网页。

启动 Puppy 后，先设置网络：

1. 点击 “Welcome” 界面中的 “Internet connection”
2. 点击 Simple Network Setup 对应的按钮
3. 选择类型为 “Wireless” 的interface，如 wlp1s0
4. 选择要连接的Wifi

在首次退出系统时，会：
1. 提示创建用于保存用户数据、安装的程序等的 pupsave 文件。可以先设置为推荐的512M大小，不够用时还可以动态扩容。
2. 提示后继使用 Puppy 的用户，选择默认的 administrator 即可

创建 pupsave 文件时，会让用户输入部分关键字，如：我输入的 fan ，最后生成的文件名为：upupbbsave-fan.4fs 。因为配置信息、安装的程序等，都保存在这个文件中，故可以通过删除该文件，得到一个全新的系统。

## 3.2 安装汉字及中文输入法

因为 Puppy 的ISO包很小，小到没有自带汉字，所以为了显示汉字，还需要手工添加 汉字字体 和 汉字输入法。

方案一：

在网页[Chinese Language Pets
](http://murga-linux.com/puppy/viewtopic.php?t=82937&search_id=408687734) 中找到符合自己 Puppy 版本的 **半中文包** ，下载并安装。半中文包中提供了汉字字体和输入法。

以我自己为例，我是安装的 BionicPup32，所以根据该网页第37页，发布时间为 “Posted: Fri 31 May 2019, 20:58” 的帖子，下载了 fcitx_4.2.7-en-zh-xenial-17.s.2.pet ，通过 File Manager 找到该文件，双击进行安装。安装完后，重启 X窗口（Restart graphical server）。在需要输入汉字时，通过快键 “Ctrl + Space” 切换中/英文输入法。


方案二：

在 Puppy Package Manager 中，输入 "kai" 进行搜索，找到并安装 fonts-arphic-gkai ，大约需要 3M 空间。
然后通过网页 [InputKing](https://inputking.com/) 来实现少量汉字的输入工作。


---

* content
{:toc}
