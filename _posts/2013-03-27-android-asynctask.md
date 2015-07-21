---
layout: post
title: AsyncTask
categories: programming
tags: [android, json]
copyright: cn
---

* content
{:toc}

Android 中的 AsyncTask 可以比较容易实现异常操作，

由于其doInBackground是在后台线程中执行，而 onPostExecute 是在UI线程中执行，所以广泛用于异步运算后更新界面。

# 多线程并发 

从 HONEYCOMB （3.0）开始，Android中的AsyncTask只会在一个后台线程中运行，如果想要并发操作，需要调用  executeOnExecutor(java.util.concurrent.Executor, Object[]) 方法，在该方法中指定Executor来进行并发。

为了让代码能在新老版本中同时运行，可以判断AsyncTask有无executeOnExecutor方法，然后进行不同的处理。下面是一个示例。

{% highlight java %}
import java.lang.reflect.Method;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import android.app.Activity;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends Activity {

    private Method executorMethod = null;
    private Executor executor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        try {
            executorMethod = AsyncTask.class.getMethod("executeOnExecutor", Executor.class, Object[].class);
            if (executorMethod != null) {
                executor = Executors.newFixedThreadPool(3);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        Button button = (Button) findViewById(R.id.button);
        final TextView textView = (TextView) findViewById(R.id.text);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AddTask task = new AddTask(textView);
                if (executorMethod == null) {
                    task.execute(1, 2, 3, 4, 5);
                } else {
                    try {
                        executorMethod.invoke(task, executor, new Integer[] { 1, 2, 3, 4, 5 });
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        });
    }

    private class AddTask extends AsyncTask<Integer, Void, Integer> {
        private TextView textView;
        
        public AddTask(TextView textView) {
            super();
            this.textView = textView;
        }

        @Override
        protected Integer doInBackground(Integer... ints) {
            int total = 0;
            for (int i = 0; i < ints.length; i++) {
                total += ints[i];
            }
            return total;
        }

        @Override
        protected void onPostExecute(Integer result) {
            textView.setText("Result: " + result);
        }
    }
}
{% endhighlight %}


# 参考

* http://developer.android.com/reference/android/os/AsyncTask.html

