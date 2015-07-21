---
layout: post
title: 在 Eclipse 中设置Java Format
categories: software
tags: [eclipse]
copyright: cn
---

# 修改方法

打开菜单"Window" -> "Preferences"，选择"Java" -> "Code Style" -> "Formatter",

以Eclipse缺省的格式为模板，创建一个新的格式，命名为 fht_formatter 。进行如下修改：

## 1、Indentation 页

* 将 "Tab Policy" 选择为 "Spaces Only" （只使用空格，而不使用TAB键）

## 2、Line Wrapping 页

* 将 "Maximum line width" 设置成 120 （每行120个字符，因为现在的显示器都很大，可以显示更多的字符）
* 勾选 "Never join already wrapped lines"

## 3、Comments 页

* 将 "General settings" 中所有勾选项全部去掉 （不对注释进行调整，因为写代码时，可能会将部分代码注释掉，如果格式化，会很难看）

# 下载地址

Eclipse 4.2.1 版本对应的格式 [fht_formatter.xml](/attachments/fht_formatter.xml)


