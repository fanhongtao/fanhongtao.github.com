---
layout: post
title: 使用 gitolite 管理 git 配置库的权限
description:  gitolite入门级文章.
categories: software
tags: [git]
copyright: cn
---

* content
{:toc}

## 0. 简介
Git是一个分布式的版本控制系统，但Git自身缺少相应的权限控制机制，需要借助于第三方软件来管理权限。

之前我是使用在[《pro git》](https://git-scm.com/book/en/v2)一书中 “[4.4 - Setting Up the Server](https://git-scm.com/book/en/v2/Git-on-the-Server-Setting-Up-the-Server)”中介绍的方法来管理Git库。但随着项目组中成员的增加，使用authorized_keys的方法已经变得很难维护 。所以需要寻求新的解决方法。这里我选择使用 gitolite 。

gitolite 支持到以分支（branch）为单位的权限控制。不过我没有使用，仅仅做到以单独的Git库为粒度进行权限控制。

## 1. （在服务器上）安装gitolite
~~登录到 git 用户，从[gitolite官网](https://github.com/sitaramc/gitolite)下载最新的 gitolite 版本。~~

先更新，防止安装依赖包时出错

```
sudo apt-get update
sudo apt-get upgrade
```

再安装 gitolite

```
sudo apt-get install gitolite3
```

安装时提示配置 SSH 信息，直接回车，忽略它。

## 2. （在服务器上）创建git用户（如果已经存在，则跳过此步骤）

创建用户 git，并设置用户的 shell 为可登录的 shell，如 /bin/bash，同时添加同名的用户组。

```
sudo adduser --system --shell /bin/bash --group git
```

然后为 git 用户设置口令。

```
sudo passwd git
```

## 3. （在服务器上）配置 gitolite

使用 git 用户登录，将管理员的公钥(public key，缺省文件名 id_rsa.pub) 拷贝到 git 用户 $HOME 目录，并改成适当的名称，如： fht.pub

执行 ```gitolite setup -pk fht.pub``` ，执行结果如下：

{% highlight bash %}
git@test:~$ gitolite setup -pk fht.pub
Initialized empty Git repository in /home/git/repositories/gitolite-admin.git/
Initialized empty Git repository in /home/git/repositories/testing.git/
WARNING: /home/git/.ssh missing; creating a new one
    (this is normal on a brand new install)
WARNING: /home/git/.ssh/authorized_keys missing; creating a new one
    (this is normal on a brand new install)
git@test:~$
{% endhighlight %}

## 4. （在PC机上）克隆 gitolite-admin
在PC机上执行如下命令（假设服务器主机名为 vihome-desktop ）：
{% highlight bash %}
git clone git@vihome-desktop:gitolite-admin
{% endhighlight %}

~~注意：由于之前是直接将我的 public key 写入到 authorized_keys 文件中，需要先将之前的 public key 从authorized_keys中删除。否则这一步无法执行成功。~~

## 5.（在PC机上）配置 gitolite-admin
gitolite-admin 下有两个子目录：

1.	conf 目录下存放了文件 gitolite.conf，用于配置各成员的访问权限。
2.	keydir目录存放所有需要访问Git库的成员的 public key文件。

### 5.1	将 public key 存放到 keydir 目录下

将项目组中各成员的 public key 更名成各成员的“拼音.pub”的命名方式。

### 5.2	修改 gitolite.conf 文件

关于配置详细的说明参见 doc/ gitolite.conf.mkd

缺省的文件内容如下：
<pre>
repo    gitolite-admin
        RW+     =   fht

repo    testing
        RW+     =   @all
</pre>

这里记录了两个Git的访问权限：

* 针对库gitolite-admin ， 允许 fht 用户读、写 和 的权限。
* 针对库testing， 允许（在keydir目录下有其public key 的）所有用户读、写 和 的权限。

允许的权限有：

* R 	表示只读
* RW	表示允许读、写
* RW+ 	表示允许读、写 和 rewind （"non-fast forward push"）

针对一般的开发人员，只需要赋予RW权限即可。

我所在的项目，需要访问Git库的开发人员分为两类：一类是具有只读权限。另一类则具有读写权限。Gitolite支持将用户或Git库分组进行管理，将人员先分组，然后针对分组进行赋权。

下面定义了一个有读写权限的群组：developer
<pre>
@developer = fht
@developer = abc   # description of abc
# 添加其他成员
</pre>

每行添加一个成员，这样比较清楚，便于后期增加、删除。

将Android相关的所有Git库定义成一个组，由于Android自身就有近200个小的Git库，再加上我们自己开发的软件，对应的库就更多了，如果一一列举，不直观，也不好维护。好在 gitolite 支持通配方式配置，通过下面的方式，将android目录下的所有Git库全部定义成一个组。
<pre>
@android_repos = android/..*
</pre>

为了正常使用，需要在服务器上：

1. 将Android相关的所有Git库全部拷贝到 服务器上git 用户的 ~/repositories/android 目录下。
2. 修改 git 用户的 ~/ .gitolite.rc 文件，将 $GL_WILDREPOS 的值设置成 1 （表示支持通配符）

针对不同群组赋予不同的权限：
<pre>
repo    @android_repos
        RW      =   @developer
        R       =   @reader
</pre>

### 5.3	提交 gitolite-admin
将 keydir 目录下的 *.pub 文件 和 	conf 目录下的 gitolite.conf 修改提交到 gitolite-admin 。这样新的权限数据就生效了。

## 6 （在服务器上）添加 Git 库

通过 gitolite-admin 配置了权限，还需要手工在服务器上添加相应库， gitolite 并不会自动创建不存在的库。

假如在 ~/repositories/android 要添加一个名为 phone的库，需要执行以下命令

```
cd ~/repositories/android
mkdir phone.git
cd phone.git
git init --bare
```

然后就可以通过以下命令来访问该库

```
git clone git@vihome-desktop:android/phone.git
```

