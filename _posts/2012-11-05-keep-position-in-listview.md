---
layout: post
title: 保持ListView的滚动位置
description:  跳转到其它Activity，又退回到ListView所在Activity时，如何保持ListView的滚动位置？
categories: programming
tags: [android, listview]
copyright: cn
---

* content
{:toc}

使用ListView时，经常会有有这样场景：

* 点击ListView中一个Item，跳转到到另外一个显示详情的Activity。
* 关闭详情Activity时，又回到ListView界面

问题是，如何才能让ListView保持在跳转前的位置？

解决方法：

在Activity中定义两个变量

{% highlight java %}
private int mPosition;
private int mTop;
{% endhighlight %}

在 onPause 中为变量赋值

{% highlight java %}
mPosition = mListView.getFirstVisiblePosition();
View first = mListView.getChildAt(0);
mTop = (first == null) ? 0 : first.getTop();
{% endhighlight %}

在 onResume 利用保存的值将ListView恢复到跳转前的位置
{% highlight java %}
mListView.setSelectionFromTop(mPosition, mTop);
{% endhighlight %}

