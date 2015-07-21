---
layout: post
title: Call constructor with parameters by reflection
categories: programming
tags: [java]
copyright: en
---

{% highlight java %}
package lang.reflect;

import java.lang.reflect.Constructor;

/**
 * Test of how to call constructor with parameters by reflection.
 */
public class ConsructorTest {
    public static void main(String[] args) {
        Class<?> clazz = null;
        try {
            clazz = Class.forName("lang.reflect.Tester");
 
            // Call public constructor
            Tester t1 = (Tester) clazz.getConstructor(int.class).newInstance(100);
            System.out.println(t1.i);
 
            // Call private constructor
            @SuppressWarnings("unchecked")
            Constructor<Tester> c = (Constructor<Tester>) clazz.getDeclaredConstructor(String.class);
            c.setAccessible(true);
            Tester t2 = c.newInstance("hello, world");
            System.out.println(t2.s);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

/**
 * Class with both public constructor and private constructor.
 */
class Tester {
    int i;
    String s;

    public Tester(int i) {
        this.i = i;
    }

    private Tester(String s) {
        this.s = s;
    }
}
{% endhighlight %}

