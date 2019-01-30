---
layout: post
title: 播放MIDI文件时指定VST音源
description:  如何使用 Midi Player 或 foobar 播放MIDI文件。更新时间：2019-01-30
categories: [music, software]
tags: [music]
copyright: cn
---

MIDI文件本身没有什么特效，只有简单的电子音，不是很好听。如果在播放 midi 时，使用[VST音源](https://baike.baidu.com/item/vst/8946220)，那就很好了。

原本是考虑在 EOP 中播放，但由于 EOP 软件没有播放列表的功能，开发者也没有这方面的考虑，所以只能放弃。

通过我的寻找、尝试，找到两种较为好用的方法，介绍如下。

# Midi Player

从 [Midi Player官网](http://falcosoft.hu/softwares.html#midiplayer) 下载最新版本。我用的版本是 5.5。国内用户也可以考虑从 [非凡软件站](https://www.crsky.com/soft/63123.html)下载。

先启动 VSTi 特性:

1. 在主界面点击 `Device Settings`
2. 勾选 `Use Bass(Soundfonts/VSTi)`
3. 点击 `OK` 按钮，保存配置。

再选择所要使用的 VST音源：

1. 在主界面点击 `Main Menu`, 再选择 `Bass VST(i) Plugins ...` 子项 , 再选择最下面的一个子项（原本叫 `VST
 Imstrument`，对应于快捷键`Shitf-I`）
2. 在 `VST Instrument` 界面中，点击 `File` ，选择音源对应的 dll 文件。
3. 如果希望 Midi Player 启动时自动加载该音源，勾选 `Autoload at Standup`

然后就可以播放 midi 文件了。

# foobar

作为一个功能强大的播放器，foobar 当然也是可以实现使用 VST 播放 midi 文件的。

从 [foobar官网](https://www.foobar2000.org/) 下载并安装 foobar，除了主程序之外，还需要安装 [MIDI Player插件](https://www.foobar2000.org/components/view/foo_midi)。

启动 foobar ，按 `Ctrl-P` 进入 `Preferences` 界面。

1. 设置 VSTi 目录：在`Advanced`中，依次选择`Playback` -> `MIDI Player`，然后点击 `VSTi Search Path` 并输入相应的路径。
2. 指定使用的 VST音源： 在 `Playback` -> `Decoding` -> `MIDI Player` 界面，在 `Output` 中的  `Plug-in` 下拉框中选择音源。

然后，就可以播放 midi 文件了。


# 比较

* 如果只是简单的听音乐，那么 foobar 无疑是最好的选择。
* 如果还想看看钢琴按键这样的效果，那么应该选择 Midi Player。

另外，在使用过程中，我发现 foobar 对 VST 的支持不是很好，经常会出：

* 对某些音源，虽然指定了 VST 目录，便却找不到音源，
* 对另一些音源，虽然能够加载，但播放时却没有声音。

相比之下，还是 Midi Player 更好用一点。


---

* content
{:toc}
