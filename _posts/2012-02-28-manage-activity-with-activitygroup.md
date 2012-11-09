---
layout: post
title: 使用ActivityGroup管理Activity
categories: android
tags: [android]
copyright: cn
---
虽然从Android 3.0（android-11）开始就建议使用Fragment、FragmentManager来替代ActivityGroup，但毕竟老版本还有很大的市场，一时半会不会选择那么高的版本，还得用ActivityGroup。

下面以一个简单的例子说明应该如何通过ActivityGroup来管理Activity。程序截图：

<a href="http://imgur.com/TlfdB"><img src="http://i.imgur.com/TlfdB.png" title="Hosted by imgur.com" alt="" /></a>
<a href="http://imgur.com/AzhR1"><img src="http://i.imgur.com/AzhR1.png" alt="" title="Hosted by imgur.com" /></a>

图1 两个子Activity的截图

在屏幕底部是一排按钮（上图中的“Button1”和“Button2”），用于显示不同的TAB标签。
按钮上方的部分是Activity显示区域。

# 1 创建ActivityGroup对应的Layout

文件 layout/group1.xml 

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >
    <LinearLayout
        android:id="@+id/container1"
        android:layout_width="fill_parent"
        android:layout_height="fill_parent"
        android:layout_weight="1"
        android:orientation="vertical" >
    </LinearLayout>
 
    <LinearLayout
        android:id="@+id/linearLayout1"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom"
        android:orientation="horizontal"
        android:gravity="center" >
        <Button
            android:id="@+id/button1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Button1"
            android:background="@drawable/button_bg" />
        <Button
            android:id="@+id/button2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Button2"
            android:background="@drawable/button_bg" />
    </LinearLayout>
</LinearLayout>
{% endhighlight %}

在上面的布局中，使用id为container1 的 LinearLayout 来表示 Acvivity的显示区域。另外一个LinearLayout 则用来显示屏幕底部的按钮。

# 2 编写 Group 代码

{% highlight java %}
public class Group1 extends ActivityGroup {
    private static final String TAG = "Group1";
    
    private LinearLayout container = null;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.group1);
        Log.i(TAG, "onCreate");
        
        container = (LinearLayout) findViewById(R.id.container1);
        
        Button btnView1 = (Button) findViewById(R.id.button1);
        btnView1.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                launchActivity("View1", View1.class);
            }
        });
        
        Button btnView2 = (Button) findViewById(R.id.button2);
        btnView2.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                launchActivity("View2", View2.class);
            }
        });
        
        launchActivity("View1", View1.class);
    }
    private void launchActivity(String id, Class<?> activityClass) {
        container.removeAllViews();
        
        Intent intent =  new Intent(Group1.this, activityClass);
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        
        Window window = getLocalActivityManager().startActivity(id, intent);
        View view = window.getDecorView();
        container.addView(view);
    }
}
{% endhighlight %}

从ActivityGroup 派生一个子类，在onCreate中为底部的按钮添加事件。
 
注意事项：

1、在显示新的Activity之前，需要先清除老的Activity。

2、新的Activity以 FLAG_ACTIVITY_SINGLE_TOP 方式打开，这样在子Activity之间切换时可以复用已有的Activity实例，不用重新创建。

# 3 编写子Activity
## 3.1 View1
### 布局

在View1中，显示了一个TextView和一个EditText。

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" 
     android:focusable="true"  android:focusableInTouchMode="true">
    <TextView
        android:id="@+id/textView1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/view1" />
    <EditText
        android:id="@+id/editText1"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content" >
    </EditText>
</LinearLayout>
{% endhighlight %}

### 代码
{% highlight java %}
public class View1 extends Activity {
    private EditText editText;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.view1);
        editText = (EditText) findViewById(R.id.editText1);
    }
    
    @Override
    protected void onResume() {
        editText.clearFocus();
        super.onResume();
    }
}
{% endhighlight %}

## 3.2  View2
### 布局

在View2中，显示了一个TextView和一个ListView。

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >
    <TextView
        android:id="@+id/textView1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/view2" />
    <ListView
        android:id="@+id/item_list"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content" >
    </ListView>
</LinearLayout>
{% endhighlight %}

### 代码

{% highlight xml %}
public class View2  extends Activity {
    private ListView listView;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.view2);
        
        listView  = (ListView)findViewById(R.id.item_list);
        listView.setAdapter(new ArrayAdapter<String>(this, android.R.layout.simple_expandable_list_item_1, getData()));
    }
    
    private List<String> getData(){
        List<String> data = new ArrayList<String>(26);
        for (int i=0; i<26; i++) {
            data.add("Item " + (char)('A' + i));
        }
        return data;
    }
}
{% endhighlight %}

# 4 已知问题

如果用户在View2的界面下，按HOME回到Launcher，然后再通过Launcher返回View2，再按“Button1”切换到View1，如果点击EditText，弹出的虚拟键盘会将按钮区域顶到上方。


<a href="http://imgur.com/1qPgO"><img src="http://i.imgur.com/1qPgO.png" title="Hosted by imgur.com" alt="" /></a>

图2 异常界面


正常情况下应该是虚拟键盘覆盖住按钮。

<a href="http://imgur.com/SzEbE"><img src="http://i.imgur.com/SzEbE.png" title="Hosted by imgur.com" alt="" /></a>

图3 正常界面

规避方法：不在子Acvivity中出现EditText，而是通过跳转到新的Acvivity来接收用户的输入。
