---
layout: post
title: Android中自动向上滚动的TextView
description:  向TextView中增加一行时，如何实现总能显示最新增加的行
categories: android
tags: [android]
copyright: cn
---

在某些场景下，要显示日志记录，需要实现让TextView能够显示最新增加的行。

总结一下，可以有以下实现方式

# 1. 使用EditText控件

你没有看错，就是EditText控件。由于EditText是TextView的子类，所以直接在XML文件中定义一个EditText控件，而在代码中将其当作TextView来使用。

在定义时，需要为EditText增加以下属性：
<pre>
android:background="@null"
android:cursorVisible="false"
android:editable="false"
</pre>

这个方法最简单，只需要配置几行属性，推荐使用。

# 2. 使用ScrollView包装TextView

在XML中定义
{% highlight xml %}
<ScrollView
    android:id="@+id/scrollView1"
    android:layout_width="match_parent"
    android:layout_height="80dp" >

    <TextView
        android:id="@+id/textView1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="" />
</ScrollView>
{% endhighlight %}

代码中，在向TextView中添加文本后，执行下面的方法来滚动ScrollView
{% highlight java %}
private void scrollToBottom() {
    mScrollView.post(new Runnable() {
        @Override
        public void run() {
            mScrollView.fullScroll(View.FOCUS_DOWN);
        }
    });
}
{% endhighlight %}

# 3. 直接滚动 TextView

也可以不借助ScrollView，而直接对 TextView 进行滚动。

在向TextView中添加文本后，执行下面的方法来滚动 TextView

{% highlight java %}
private void scrollTextViewToBottom() {
    mTextView.post(new Runnable() {
        @Override
        public void run() {
            // find the amount we need to scroll.  This works by
            // asking the TextView's internal layout for the position
            // of the final line and then subtracting the TextView's height
            final int scrollAmount = mTextView.getLayout().getLineTop(mTextView.getLineCount() - 1)
                    - mTextView.getHeight();
            // if there is no need to scroll, scrollAmount will be <=0
            if (scrollAmount > 0)
                mTextView.scrollTo(0, scrollAmount);
            else
                mTextView.scrollTo(0, 0);
        }
    });
}
{% endhighlight %}

由于没有嵌套在 ScrollView 里面，所以这种方法显示的内容无法再查看已经滚出视线之外的内容，使用场景受到限制。

# 参考文档

* [Making TextView Scrollable in Android](http://stackoverflow.com/questions/1748977/making-textview-scrollable-in-android)
* [auto-scrolling TextView in android to bring text into view](http://stackoverflow.com/questions/3506696/auto-scrolling-textview-in-android-to-bring-text-into-view)

