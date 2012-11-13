---
layout: post
title: JSON
categories: java
tags: [java, json]
copyright: cn
---

# 什么是 JSON

JSON(/ˈdʒeɪsən/, JavaScript Object Notation) 是一种轻量级的数据交换格式。 易于人阅读和编写。同时也易于机器解析和生成。

中文介绍的[官方文档][JSON]

下面是一个JSON的例子：

{% highlight json %}
{
    "firstName": "John",
    "lastName": "Smith",
    "age": 25,
    "address": {
        "streetAddress": "21 2nd Street",
        "city": "New York",
        "state": "NY",
        "postalCode": "10021"
    },
    "phoneNumber": [
        {
            "type": "home",
            "number": "212 555-1234"
        },
        {
            "type": "fax",
            "number": "646 555-4567"
        }
    ]
}
{% endhighlight %}

# JSON库

在[JSON官网]列举了常见各种语言的JSON解析库，以Java为例，常见的有
* [GSON][]
* [Jackson JSON][]
* [Fast JSON][] , 一个中国人写的开源版本

网上的文章说 Jackson 远比 GSON快，老版本的确是这样，但最新版本的GSON已经与Jackson相差无几。

这里借用了 martinadamek 所写的[测试工程](https://github.com/martinadamek/json-android-compare)，只是替换了最新的库版本，

修改前，在我的魅族M9上的测试结果：
<pre>
[1 run] Android: 99ms
[1 run] Gson: 86ms
[1 run] JSON.simple: 128ms
[1 run] Jackson: 55ms
[100 runs] Android: 8557ms
[100 runs] Gson: 11341ms
[100 runs] JSON.simple: 12890ms
[100 runs] Jackson: 4878ms
[5 runs] Android: 437ms
[5 runs] Gson: 427ms
[5 runs] JSON.simple: 596ms
[5 runs] Jackson: 240ms
</pre>

修改前使用的是 GSON 1.6, Jackson 1.7.1，测试结果显示 GSON 比 Jackson 多花一倍的时间。

修改成较新版本

* Jackson 2.1.1, 发布日期，2012-11-11
* GSON 2.2.2, 发布日期，2012-07-02

测试结果
<pre>
[1 run] Android: 100ms
[1 run] Gson: 75ms
[1 run] JSON.simple: 140ms
[1 run] Jackson: 70ms
[100 runs] Android: 8457ms
[100 runs] Gson: 53081ms
[100 runs] JSON.simple: 12473ms
[100 runs] Jackson: 4532ms
[5 runs] Android: 422ms
[5 runs] Gson: 286ms
[5 runs] JSON.simple: 600ms
[5 runs] Jackson: 248ms
</pre>

测试结果显示，GSON 大概比 Jackson 多用 10~20% 的时间。


# 参考

* http://stackoverflow.com/questions/7935078/performance-and-usability-comparison-of-android-json-libraries
* http://www.martinadamek.com/2011/02/04/json-parsers-performance-on-android-with-warmup-and-multiple-iterations/


[JSON]: http://www.json.org/json-zh.html
[GSON]: http://code.google.com/p/google-gson/
[Jackson JSON]: http://jackson.codehaus.org/
[Fast JSON]: https://github.com/AlibabaTech/fastjson
