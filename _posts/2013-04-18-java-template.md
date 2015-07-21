---
layout: post
title: Java中的模板
categories: programming
tags: [java]
copyright: cn
---

* content
{:toc}

从Java 5 (Tiger) 开始，就支持了泛型（模板）。

# 1. 模板类

我们可以这样定义模板类

{% highlight java %}
class Result<T> {
    T value;

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }
}
{% endhighlight %}

# 2. 模板函数

如果只是某个函数需要支持泛型，可以定义一个模板函数

{% highlight java %}
public <T extends Comparable<T>> T max(T first, T second) {
    if (first.compareTo(second) < 0) {
        return second;
    } else {
        return first;
    }
}
{% endhighlight %}


# 3. 技巧

## 3.1 定义一个返回子类对象的函数

通常情况下，定义一个类时，如果想要返回自身，我们是返回 this ，但如果想要返回子类对象，而又不想让调用者进行类型转换的话，则需要使用一点技巧。

定义父类

{% highlight java %}
public class Parent<T extends Parent<T, V>, V> {
    V value;

    public V getValue() {
        return value;
    }

    public T setValue(V value) {
        this.value = value;
        return self();
    }

    @SuppressWarnings("unchecked")
    private T self() {
        return (T) this;
    }
}
{% endhighlight %}

考虑到可能有多处返回的情况，通过单独定义一个 self 方法，就能避免每处返回都写 @SuppressWarnings。

定义子类

{% highlight java %}
public class Child<T> extends Parent<Child<T>, T> {
    public void displayValue() {
        System.out.println(getValue());
    }
}
{% endhighlight %}


使用：

{% highlight java %}
Child<Integer> child = new Child<Integer>();
child.setValue(123).displayValue();
{% endhighlight %}

上例中，先调用继承自父类的 setValue 方法为变量赋值，紧接着调用子类的 displayValue 显示该值。

如果不使用上而的技巧在返回时进行类型转换，那就只能由调用者进行强制类型转换，如下：

{% highlight java %}
((Child)child.setValue(123)).displayValue();
{% endhighlight %}

显然，这样的调用方式很不友好。

