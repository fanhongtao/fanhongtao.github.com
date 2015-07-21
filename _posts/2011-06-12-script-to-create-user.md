---
layout: post
title: 一个创建用户的脚本
description:  一个快速创建Linux用户的Bash脚本
categories: software
tags: [linux]
copyright: cn
---

在当管理员时，不时会需要创建用户，但创建用户的命令参数比较多，所以写一个脚本 add_user.sh 来实现快速创建用户。

{% highlight bash %}
#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0  user-name"
    exit -1
fi

# create a user
useradd -g users -s /bin/bash -d /home/$1 -m  $1

# set the password
echo $1:$1 | chpasswd
{% endhighlight %}

useradd是Linux下创建用户的命令： 
<pre>
    -g  users 表示用户属于users群组 
    -s  /bin/bash 表示用户登录时使用 bash 
    -d  /home/$1 表示用户的家目录在创建在 /home/ 下，目录名与用户名相同。 
    -m 表示用户的家目录不存在时自动创建。正常情况下还没有用户，肯定也没有目录了。 
    最后的 $1 用于指定所创建的用户名 
</pre>

刚创建的用户没有密码，所以通过 chpasswd 命令将其密码指定为与用户名相同。 


当需要创建用户 xyz 时，只用以 root 身份执行如下命令即可：
{% highlight bash %}
./add_user.sh  xyz  
{% endhighlight %}
