---
layout: post
title: GIMP使用
description:  记录我所使用到的最基本的功能： 显示汉字 和 制作透明图片
categories: tool
tags: GIMP
copyright: cn
---
GIMP 是 GNU 图像处理程序(GNU Image Manipulation Program)的缩写。包括几乎所有图象处理所需的功能，号称Linux下的PhotoShop。GIMP在Linux系统推出时就风靡了许多绘图爱好 者的喜爱，它的接口相当轻巧，但其功能却不输于专业的绘图软件；它提供了各种的影像处理工具、滤镜，还有许多的组件模块，对于要制作一个又酷又炫的网页按钮或网站Logo来说是一个非常方便好用的绘图软件，因为它也提供了许多的组件模块，你只要稍加修改一下，便可制作出一个属于你的网页按钮或网站 Logo。

## 1 显示汉字

在Windows下安装GIMP后，界面显示乱码。 显示汉字的方法：
修改 GIMP-2.0\etc\gtk-2.0\gtkrc 文件，在 style "msw-default" 的大括号中增加一行内容
<pre>
font_name="Sans 9"
</pre>


## 2 制作透明的GIF/PNG图片

### 2.1 将不透明的图片修改成透明

第一步：创建Alpha通道

通过菜单“图层(L)”－》“透明(A)”－》“添加Alpha通道(H)”，为图片添加一个Alpha通道。点击菜单后从界面上看不到任何效果，但如果再次通过菜单“图层(L)”－》“透明(A)”，发现“添加Alpha通道(H)”已经被置灰，而“移出Alpha通道(R)”菜单项变成可用的了。

第二步：选择需要透明的颜色

通过菜单“选择(S)”－》“按颜色(B)  Shitf+O”，然后将鼠标移到图片上需要变成透明的颜色上面，此时，GIMP会使用选中的颜色使用虚线勾绘出来，

第三步：删除选中的颜色

通过菜单“编辑(E)”－》“清除(E)  Delete”

第四步：保存图片。

### 2.2 修改现有的图片

下面以修改Android自带皮肤中控制键对应的controls.png为例进行说明：

第一步：使用GIMP打开现有的带透明效果的PNG图片 controls.png

第二步：由于目标图片的高度比现有的图片高，但宽度需要维持不变，所以需要设置画布大小。通过菜单“图像(I)”－》“画布大小(V)…”打开修改画面，点击下图中红色的图标，断开宽度与高度关联关系，然后输入新的高度值，最后将“更改图层大小(L)”下拉选项修改成“全部图层”，然后点击“改变大小(R)”。

第三步：通过选择、删除、剪贴、拷贝、移动等一系列操作，修改按键的布局，然后保存


### 参考文档

* [The Gimp: Making Colors in a GIF Transparent](http://aplawrence.com/Linux/crousegif.html)




