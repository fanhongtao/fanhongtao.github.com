---
layout: post
title: Content Provider
categories: programming
tags: [android]
copyright: cn
---

* content
{:toc}

# 1 Content URI 定义
Content URI可以使用下面的公式表示：

<pre>
content-uri = "content://" + authority + "/" + path [ + "/" + id ]
</pre>

其中， 

* "content://" 是固定的的常量，被称为 scheme, 表示这是一个Content请求
* authority 就是在 android:authorities 的值。

Android是通过authority字段来区分不同的 Content Provider的，要求在整个系统内唯一。通常都选择提供Content Provider的完整类名（或类所在包的包名）作为authority。

如果想要安装的APK中的CP与系统中某一个APK已经提供的CP的 ，则在安装会会提示如下错误：

Can't install because provider name <i>authority</i> (in package <i>app package name 1</i>) is already used by <i>app package name 2</i>

* path  用于指定在某个cp内部的表名

path 内部可以包括字符 '/'，如："abc/table1", 表示需要访问表 table1，和 "table1" 的效果是一样的。那加一个 "abc/" 前缀有什么好处？便于使用通配符进行URI匹配。

* id 只能是一个数字，用于指定表内部的一条记录。对于数据库来说，该数字就是表的主键. 通常是字段 "_id" 。

注意：CP的内容不一定真是的SQLite数据库中的一个表，也可能多张表进行联合查询的结果，也可能是某个文本文件，或网络上的内容。只要能够 path 唯一标识出来就行。

一般而言，一个数据库对应于一个CP。而该库中不同的表则通过 path 来进行区分。
    
A content URI pattern matches content URIs using wildcard characters:
        *: Matches a string of any valid characters of any length.
        #: Matches a string of numeric characters of any length.

完整的例子：
<pre>
content://com.app1/table1
content://com.app1/abc/table2
content://com.app1/abc/table3
content://com.app1/abc/table4/1
content://com.app1/abc/table4/2
        
content://com.app1/abc/*            能够匹配所有以"content://com.app1/abc/"为前缀的URL, 如上例中的 table2, table3, table4
content://com.app1/abc/table4/#     能够匹配table4的所有记录
</pre>


# 2 编写Content Provider服务端

## 创建一个 android.content.ContentProvider 的子类

* 定义 AUTHORITY 常量

<pre>
public static final String AUTHORITY = "com.example.provider";
public static final Uri AUTHORITY_URI = Uri.parse("content://" + AUTHORITY);
</pre>
这里定义的字符串需要与 android:authorities 的值相同

* 定义用于解析客户端的请求 UriMatcher

{% highlight java %}
private static final int MESSAGE = 1;
private static final int MESSAGE_ITEM = 2;
private static final UriMatcher sUriMatcher = new UriMatcher(UriMatcher.NO_MATCH);
static {
    sUriMatcher.addURI(AUTHORITY, "message", MESSAGE);        // 对 message 表进行整表访问的URI
    sUriMatcher.addURI(AUTHORITY, "message/#", MESSAGE_ITEM); // 对 message 表中某条记录进行访问的URI
    ... // 根据自己的情况，还可以添加更多的URI。
}
{% endhighlight %}

其中的 1 , 2 是sUriMatcher匹配到满足条件的URI后返回的数字，用于 switch 分支处理，通常会定义成常量。

* 实现 ContentProvider 的 query、insert、update、delete 方法

在实现的方法中，先使用 sUriMatcher 匹配请求，然后根据匹配结果，进行分支处理。如：

{% highlight java %}
public Cursor query(Uri uri, String[] projection, String selection, String[] selectionArgs, String sortOrder) {
    SQLiteDatabase db = dbHelper.getReadableDatabase();
    Cursor cursor;
    switch (sUriMatcher.match(uri)) {
    case MESSAGE:
        // 业务逻辑
        //   cursor = ...
        break;
    // 其它需要处理的分支
    default:
        throw new IllegalArgumentException("Unknown URI " + uri);
    }
    cursor.setNotificationUri(getContext().getContentResolver(), uri);
    return cursor;
}
{% endhighlight %}

注意： query 等方法可以同时被多个线程调用，所以这些方法必须线程安全。也就是不能使用全局变量、静态变量。（如果非要使用，必须加锁）

## 在 AndroidManifest.xml 中增加provider定义

{% highlight xml %}
<provider android:name=".MessageContentProvider"
    android:authorities="com.example.provider"
    android:multiprocess="true" >
</provider>
{% endhighlight %}

其中：

* android:name 就是刚才创建的类的全名
* android:authorities 是自己指定的一个字符串。
* android:multiprocess 表示该Provider是否可以被其它进程访问。如果为false（默认值），表示只能在本应用内部访问。

## 小技巧

CP访问数据库时，最终还是要依赖于SQLite, 所以可以在  SQLiteOpenHelper 的子类中定义表名

{% highlight java %}
public interfact Tables {
	public static final String MESSAGE = "message";
}
{% endhighlight %}

这样，在定义 sUriMatcher 时，可以使用
{% highlight java %}
sUriMatcher.addURI(MessageContract.AUTHORITY, Tables.MESSAGE, 1);
{% endhighlight %}

同样的，可以针对联合查询定义一接口， 同时，还可以将每张表的字段名也定义成接口：
{% highlight java %}
public interfact UnitedTables {
    public static final String U1 = "unition-name-1";
}

public interface MessageColumns implements android.provider.BaseColumns {
    public static final String MSG_ID = "msg_id";
    // ...
}
{% endhighlight %}

# 3 Content Provider 客户端

通过 Context.getContentResolver() 获取一个 ContentResolver，然后通过该 ContentResolver 来访问 ContentProvider。

由于Activity 是 Context 的子类，所以我们只需要直接调用 getContentResolver() 即可。

## 查询记录

除了 getContentResolver().query(...) ，还可以通过 Activity.managedQuery() 来查询。

Activity.managedQuery() 会对查询返回的 Cursor 生命周期进行管理。

{% highlight java %}
public final Cursor managedQuery(Uri uri,
                                 String[] projection,
                                 String selection,
                                 String sortOrder)
{
    Cursor c = getContentResolver().query(uri, projection, selection, null, sortOrder);
    if (c != null) {
        startManagingCursor(c);
    }
    return c;
}
{% endhighlight %}

从上面的代码看，managedQuery 内部调用了 startManagingCursor 来管理Cursor。


## 添加记录

先构造一个 ContentValues 对象，通过反复调用 cv.put设置各字段的值，再通过 insert 来添加记录。

{% highlight java %}
ContentValues cv = new ContentValues();
cv.put("msg_id", "1234567");
// .. 设置其它字段的值
getContentResolver().insert(MessageContract.CONTENT_URI, cv);
{% endhighlight %}

cv.put 第一个参数是表中的字段名，第二个参数是该字段对应的值。

## 删除记录

通过 ContentResolver.delete() 来删除

## 更新记录

通过 ContentResolver.update() 来更新记录

## 事务操作

创建一个 ContentProviderOperation 数组，然后将相应的操作添加到数组中，最后通过 ContentResolver.applyBatch 实现批量操作。

下面是一个添加联系人的例子：

{% highlight java %}
public void testAddContact() throws Exception {
    Uri uri = Uri.parse("content://com.android.contacts/raw_contacts");
    ContentResolver resolver = getContext().getContentResolver();
    ArrayList<ContentProviderOperation> operations = new ArrayList<ContentProviderOperation>();
    ContentProviderOperation op1 = ContentProviderOperation.newInsert(uri)
        .withValue("account_name", null)
        .build();
    operations.add(op1);
    
    uri = Uri.parse("content://com.android.contacts/data");
    ContentProviderOperation op2 = ContentProviderOperation.newInsert(uri)
        .withValueBackReference("raw_contact_id", 0)
        .withValue("mimetype", "vnd.android.cursor.item/name")
        .withValue("data2", "Jack")
        .build();
    operations.add(op2);
    
    ContentProviderOperation op3 = ContentProviderOperation.newInsert(uri)
        .withValueBackReference("raw_contact_id", 0)
        .withValue("mimetype", "vnd.android.cursor.item/phone_v2")
        .withValue("data1", "13312345678")            
        .withValue("data2", "2")
        .build();
    operations.add(op3);
    
    ContentProviderOperation op4 = ContentProviderOperation.newInsert(uri)
        .withValueBackReference("raw_contact_id", 0)
        .withValue("mimetype", "vnd.android.cursor.item/email_v2")
        .withValue("data1", "foo@163.com")            
        .withValue("data2", "2")
        .build();
    operations.add(op4);
    
    resolver.applyBatch("com.android.contacts", operations);
}
{% endhighlight %}


# 4 使用中遇到的问题

## 访问另一个APK中的CP时报错

提示： java.lang.UnsupportedOperationException: Only CrossProcessCursor cursors are supported across process for now

解决方法： 创建一个Wrapper，将CP查询返回的cursor封装成一个可以跨进程的Cursor。

参考： http://stackoverflow.com/questions/3976515/cursor-wrapping-unwrapping-in-contentprovider

{% highlight java %}
import android.database.CrossProcessCursor;
import android.database.Cursor;
import android.database.CursorWindow;
import android.database.CursorWrapper;

public class CrossProcessCursorWrapper extends CursorWrapper implements CrossProcessCursor {
    public CrossProcessCursorWrapper(Cursor cursor) {
        super(cursor);
    }

    @Override
    public CursorWindow getWindow() {
        return null;
    }

    @Override
    public void fillWindow(int position, CursorWindow window) {
        if (position < 0 || position > getCount()) {
            return;
        }
        window.acquireReference();
        try {
            moveToPosition(position - 1);
            window.clear();
            window.setStartPosition(position);
            int columnNum = getColumnCount();
            window.setNumColumns(columnNum);
            while (moveToNext() && window.allocRow()) {
                for (int i = 0; i < columnNum; i++) {
                    String field = getString(i);
                    if (field != null) {
                        if (!window.putString(field, getPosition(), i)) {
                            window.freeLastRow();
                            break;
                        }
                    } else {
                        if (!window.putNull(getPosition(), i)) {
                            window.freeLastRow();
                            break;
                        }
                    }
                }
            }
        } catch (IllegalStateException e) {
            // simply ignore it
        } finally {
            window.releaseReference();
        }
    }

    @Override
    public boolean onMove(int oldPosition, int newPosition) {
        return true;
    }
}
{% endhighlight %}
