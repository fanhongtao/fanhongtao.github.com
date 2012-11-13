---
layout: post
title: Android SMS
categories: android
tags: [android, sms, mms]
copyright: cn
---

# 1 基本原理

SMS： 短信 Short Message Service

Android将短信和彩信都存在 mmssms.db 中, 存放路径 ： /data/data/com.android.providers.telephony/databases/mmssms.db , 真机上需要 root 后才能访问该文件。


# 1 表结构

Android通过 [MmsSmsDatabaseHelper.java][] 来管理SMS 和 MMS，通过查看该类的代码，可以了解到具体的数据库表结构。

短信处理主要使用到表 sms ，编号为55的数据库版本创建sms表的语句如下（汉字注释是我增加的针对字段的说明，并非原代码中的内容）：
{% highlight java %}
static final int DATABASE_VERSION = 55;
 
db.execSQL("CREATE TABLE sms (" +
		   "_id INTEGER PRIMARY KEY," +
		   "thread_id INTEGER," +   // 会话的序号，同一发信人的id相同
		   "address TEXT," +     // 发件人手机号码
		   "person INTEGER," +   // 联系人列表里的序号，0表示陌生人
		   "date INTEGER," +     // 发件日期
		   "date_sent INTEGER DEFAULT 0," +
		   "protocol INTEGER," +  // 协议，分为： 0 SMS_RPOTO, 1 MMS_PROTO
		   "read INTEGER DEFAULT 0," +  // 是否阅读 0未读， 1已读
		   "status INTEGER DEFAULT -1," + // a TP-Status value
										  // or -1 if it
										  // status hasn't
										  // been received
										  // 状态 -1接收，0 complete, 64 pending, 128 failed 
		   "type INTEGER," +   // 取值： 
                               //   ALL    = 0;
                               //   INBOX  = 1;
                               //   SENT   = 2;
                               //   DRAFT  = 3;
                               //   OUTBOX = 4;
                               //   FAILED = 5;
                               //   QUEUED = 6;
		   "reply_path_present INTEGER," +
		   "subject TEXT," +   // 短信的主题
		   "body TEXT," +      // 短信内容
		   "service_center TEXT," +  // 短信中心号码
		   "locked INTEGER DEFAULT 0," +
		   "error_code INTEGER DEFAULT 0," +
		   "seen INTEGER DEFAULT 0" +
		   ");");
{% endhighlight %}
注意： 数据库中的 INTEGER 对应到Java的 Long 类型。

# 2 相关 URI

我们不能直接读取 mmssms.db ，只能通过系统提供的 [Content Provider](/2012/11/07/content_provider.html)来访问。

短信相关的URI有
{% highlight java %}
sURLMatcher.addURI("sms", null, SMS_ALL);                       // 所有短信
sURLMatcher.addURI("sms", "#", SMS_ALL_ID);
sURLMatcher.addURI("sms", "inbox", SMS_INBOX);                  // 收件箱
sURLMatcher.addURI("sms", "inbox/#", SMS_INBOX_ID);
sURLMatcher.addURI("sms", "sent", SMS_SENT);                    // 已发送
sURLMatcher.addURI("sms", "sent/#", SMS_SENT_ID);
sURLMatcher.addURI("sms", "draft", SMS_DRAFT);                  // 草稿
sURLMatcher.addURI("sms", "draft/#", SMS_DRAFT_ID);
sURLMatcher.addURI("sms", "outbox", SMS_OUTBOX);                // 发件箱
sURLMatcher.addURI("sms", "outbox/#", SMS_OUTBOX_ID);
sURLMatcher.addURI("sms", "undelivered", SMS_UNDELIVERED);
sURLMatcher.addURI("sms", "failed", SMS_FAILED);                // 发送失败
sURLMatcher.addURI("sms", "failed/#", SMS_FAILED_ID);
sURLMatcher.addURI("sms", "queued", SMS_QUEUED);                // 待发送列表
sURLMatcher.addURI("sms", "conversations", SMS_CONVERSATIONS);  // 会话列表
sURLMatcher.addURI("sms", "conversations/*", SMS_CONVERSATIONS_ID);
sURLMatcher.addURI("sms", "raw", SMS_RAW_MESSAGE);
sURLMatcher.addURI("sms", "attachments", SMS_ATTACHMENT);
sURLMatcher.addURI("sms", "attachments/#", SMS_ATTACHMENT_ID);
sURLMatcher.addURI("sms", "threadID", SMS_NEW_THREAD_ID);
sURLMatcher.addURI("sms", "threadID/*", SMS_QUERY_THREAD_ID);
sURLMatcher.addURI("sms", "status/#", SMS_STATUS_ID);
sURLMatcher.addURI("sms", "sr_pending", SMS_STATUS_PENDING);
sURLMatcher.addURI("sms", "icc", SMS_ALL_ICC);
sURLMatcher.addURI("sms", "icc/#", SMS_ICC);
//we keep these for not breaking old applications
sURLMatcher.addURI("sms", "sim", SMS_ALL_ICC);
sURLMatcher.addURI("sms", "sim/#", SMS_ICC);
{% endhighlight %}

最新的URI可以参见： [SmsProvider.java][]

# 3 读取短信

## 3.1 获取短信列表

通常意义上的短信列表是指会话列表，就是同一联系人的短信记录只显示最近一条的那种显示方式。

通过URI地址 content://sms/conversations 可以获取短信的会话列表。但Android系统自带的查询结果只有三个字段。如：
 * thread_id 会话编号
 * msg_count 该会话中的短信条数
 * snippet   该会话中最后一条短信的内容

一般而言，我们还需要在会话列表中显示联系人信息（姓名、头像、电话号码等） 和 最后一次收/发短信的时间。所以还需要对系统的返回结果进行扩充。

关键代码如下：
{% highlight java %}
String[] projection = new String[] { "thread_id as _id", "thread_id", "msg_count", "snippet",
        "sms.address as address", "sms.date as date" };
Uri uri = Uri.parse("content://sms/conversations");
Cursor cursor = managedQuery(uri, projection, null, null, "sms.date desc");
{% endhighlight %}

* "thread_id as _id" ： 为了让查询结果可以传送给 CursorAdapter
* "sms.address as address" : 查询联系人号码
* "sms.date as date" : 查询最后一条短信的日期
* "sms.date desc" : 会话降序排序

## 获取短信的联系人

虽然sms表中有person字段，但如果是先接收到短信再将陌生人添加到联系人列表，则person仍然是为0。所以不能依赖 person 字段，只能通过 address 去查询联系人。


[MmsSmsDatabaseHelper.java]: https://github.com/android/platform_packages_providers_telephonyprovider/blob/master/src/com/android/providers/telephony/MmsSmsDatabaseHelper.java

[SmsProvider.java]: https://github.com/android/platform_packages_providers_telephonyprovider/blob/master/src/com/android/providers/telephony/SmsProvider.java


