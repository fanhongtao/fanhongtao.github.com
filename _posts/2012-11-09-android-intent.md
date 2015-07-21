---
layout: post
title: Android Intent机制
description:  
categories: programming
tags: [android, intent]
copyright: cn
---

* content
{:toc}

# 1 基本原理

Android应用由三大核心组件（Component）： activities, services 和 broadcast（广播），本文中使用“组件”一词来表示统称这三者。

Intent 可以用于：

* 启动Activity

    通过  Context.startActivity() 来启动Activity。
	
    如果需要获取返回Activity的返回结果，就应该通过 Activity.startActivityForResult() 来启动Activity。而被启动的Activity需要重载 Activity.setResult() 来填写返回值。

* 启动 Service
 
	Context.startService() 
	
	Context.bindService() 

* 发送 Broadcast

    Context.sendBroadcast()
	
    Context.sendOrderedBroadcast()
	
    Context.sendStickyBroadcast()

根据调用的函数不同，Android会将Intent对象按照不同的方式进行处理。如：startActivity() 只可能打开一个Activity，如果找不对对应的Acvitiry，则直接抛出异常。而不会对Service或Broadcast有什么影响。

# 2 Intent对象

## Intent 的组成

Intent 对象包括了需要执行的操作（或已经发生的事件）。

Intent 对象由以下几部分组成：

* Component name
    
    这是一个ComponentName对象（mComponent），该对象有两个成员：
    
    1. mPackage : 接收Intent的组件对应的Package名。
    2. mClass : 处理Intent的类的完整类名。
    
    当Intent有Component name时，就直接将Intent分配给 mPackage 对应组件中的 mClass 类的实例来处理。

    通过构造方法 Intent(Context packageContext, Class<?> cls) 实现对 Component name 属性赋值。
    也可以通过 setComponent(ComponentName) 或 setClass(Context, Class) 来设置该属性。
    
* Action

    这是一个字符串对象（mAction）：
    
    * 对 Activity 和 Service 用于标明需要执行的操作（action） 
    * 对 Broadcast，则标明已经发生的事件

    Android定义了一些缺省的Action，可以在[Intent][intent]查看完整的定义。
    
    除了使用缺省的Action，用户也可以使用自己定义的字符串来作为Action。为了防止Action重名，必须将对应的包名作为自定义Action字符串的前缀。
    
    通过 Intent(String action) 或 setAction() 来设置Action。
    
* Data

    所要处理的数据的URI（对应于 mData 属性） 和该数据的[MIME类型](http://en.wikipedia.org/wiki/MIME)（对应于 mType 属性） 
        
    通过setData()设置URI（同时清除MIME类型），通过setType()设置MIME类型 （同时清除URI）， 通过setDataAndType() 设置URI和MIME类型. 
    
    通过getData() 来读取URI，getType() 来读取MIME类型.
    
* Category

    Category用于限定能够处理Intent的组件。
    
    对应于一个字符串HashSet（mCategories），即，可以同时指定多个Category。
    
    通过 addCategory() 添加 category ， removeCategory() 删除 category , getCategories() 获取已有的 category.

* Extras
    
    一个用于提供附加信息的“键-值”对（mExtras）。
    
    Intent 提供了一组 put...() / get...() 方法来读写数据。也可以通过  putExtras() 和 getExtras() 将其作为一个整体进行访问。

* Flags 
    
    对应于一个int类型的属性 mFlags。虽然是一个整数，实际该整数的每个bit都表示一个Flag。
    
    可以在[Intent](http://developer.android.com/reference/android/content/Intent.html)查看所支持Flag的完整定义。

## Intent 分类

Intent 可以分为显示和隐示两种：

* 显示（Explicit Intents）：有 Component name 成员的Intent。Android会将Intent传递给 mPackage 对应的组件中的一个 mClass 实例。
* 隐示（Implicit Intents）：没有指定 Component name 成员的Intent。
    由于没有指明需要由那个类来处理，Android会根据Intent的其它成员（Action、Data、Category）来推算出合适的对象。如果超过一个可能的对象，则会提示用户选择一个。
    Android会根据 Intent Filter 来计算合适的组件。

# 3 Intent Filter

一个组件可以声明零个或多个Filter。一个隐示Intent必须满足某个组件的至少一个Filter，才能传递给该组件处理。所以可以将Filter看成是白名单。

Intent Filter只对隐示的Intent生效。显示的Intent由于已经明确指定了目标，不受Filter的限制。

* 如果一个组件没有申明Intent Filter，则它就只能处理显示的Intent。即：不声明Filter也就意味着没有那个隐示的Intent能满足条件。
* 如果一个组件申明了Intent Filter，则它即可以处理显示的Intent，也可以处理满足Intent Filter的隐示的Intent。

通常，一个组件在 AndroidManifest.xml 中申明其 Intent Filter。但有一个例外，broadcast receivers 是在Java代码中通过Context.registerReceiver() 来实现的。

Intent Filter 通过组件的 intent-filter 子元素进行申明，每个 intent-filter 子元素表示一个Filter。

每个 intent-filter 子元素内部，又可以有 action、category 和 data 三种子元素。一个Intent必须同时满足 Filter的 Action、Data、Category 三个测试，才被认为满足的Filter。

## Action 测试

一个Filter可以有一个或多个 action 子元素。Intent只需要满足某一个action子元素即可。

* 如果一个 action 子元素都没有，则认为所有Intent都不满足条件。
* 如果Intent没有Action元素，则认为该Intent能满足Action的测试条件。

## Category测试

一个Filter可以有零个或多个 category 子元素。

Intent和 Filter 都可以指定多个Category。只有Intent所指定的每个Category都能在Filter中找到，才算满足条件。

通常如果Intent中没有指定 Category，则认为该Intent能满足 Category 的测试条件。但有一个例外，Android会认为传递给 startActivity() 的Intent都带有一个名为 android.intent.category.DEFAULT 的 Category。所以，如果一个Activity需要接收隐示Intent，就必须在Filter中添加 android.intent.category.DEFAULT。但如果Activity的Filter有 "android.intent.action.MAIN" 和 "android.intent.category.LAUNCHER"（表示作为APK启动时的第一个Activity），则也可以不指定 android.intent.category.DEFAULT。

## Data测试

一个Filter可以有零个或多个 data 子元素。每个data子元素包括 URI (android:scheme) 和 类型 (android:mimeType) 两个属性。

URI 的格式
<pre>
scheme://host:port/path
</pre>

如： 
<pre>
content://com.example.project:200/folder/subfolder/etc
</pre>

类型属性指定所支持的数据的MIME类型，如“image/jpeg”。可以通过查看 android.webkit.MimeTypeMap 的源码查看Android所支持的MIME。

MIME支持通配符 * , 如： audio/\* 表示所有音频，而 \*/\* 则表示支持任意类型的文件。

## Filter的例子

下面是一个Filter的例子

{% highlight xml %}
<activity android:name="NotesList" android:label="@string/title_notes_list">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <action android:name="android.intent.action.EDIT" />
        <action android:name="android.intent.action.PICK" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="vnd.android.cursor.dir/vnd.google.note" />
    </intent-filter>
    <intent-filter>
        <action android:name="android.intent.action.GET_CONTENT" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="vnd.android.cursor.item/vnd.google.note" />
    </intent-filter>
</activity>
{% endhighlight %}


# 4 参考资料

* [Intents and Intent Filters](http://developer.android.com/guide/components/intents-filters.html)
* [Intent][intent]

[intent]: http://developer.android.com/reference/android/content/Intent.html



