---
layout: post
title: 开启Cygwin的SSH服务
description: 安装 Cygwin，开启SSH服务，将Windows机器模拟成一台Linux服务器。
categories: computer
tags: [windows, cygwin, ssh]
copyright: cn
---

* content
{:toc}

# 1. 安装 Cygwin

从 [Cygwin官网](http://www.cygwin.com/)下载 setup 文件：32位机器下载 [setup-x86.exe](http://cygwin.com/setup-x86.exe)，64位则下载 [setup-x86_64.exe](http://cygwin.com/setup-x86_64.exe)。

运行 setup 文件，在选择安装包时，需要选择

* Net 中的 openssh

# 2. 修改 Cygwin.bat

修改安装目录下的 Cygwin.bat, 添加一行 “set CYGWIN=binmode ntsec”， 修改后文件内容如下：

<pre>
@echo off

C:
chdir C:\cygwin\bin
set CYGWIN=binmode ntsec
bash --login -i
</pre>


# 3. 配置 SSHD 服务

以 Administrator 权限运行 Cygwin.bat 进入 Cygwin Terminal ，执行 ssh-host-config 命令。

下面是我的执行过程

<pre>
fht@fht-THINK ~
$ ssh-host-config

*** Query: Overwrite existing /etc/ssh_config file? (yes/no) yes
*** Info: Creating default /etc/ssh_config file
*** Query: Overwrite existing /etc/sshd_config file? (yes/no) yes
*** Info: Creating default /etc/sshd_config file
*** Info: Privilege separation is set to yes by default since OpenSSH 3.3.
*** Info: However, this requires a non-privileged account called 'sshd'.
*** Info: For more info on privilege separation read /usr/share/doc/openssh/README.privsep.
*** Query: Should privilege separation be used? (yes/no) yes
*** Info: Note that creating a new user requires that the current account have
*** Info: Administrator privileges.  Should this script attempt to create a
*** Query: new local account 'sshd'? (yes/no) yes
*** Info: Updating /etc/sshd_config file

*** Query: Do you want to install sshd as a service?
*** Query: (Say "no" if it is already installed as a service) (yes/no) yes
*** Query: Enter the value of CYGWIN for the daemon: [] binmode ntsec
*** Info: On Windows Server 2003, Windows Vista, and above, the
*** Info: SYSTEM account cannot setuid to other users -- a capability
*** Info: sshd requires.  You need to have or to create a privileged
*** Info: account.  This script will help you do so.

*** Info: You appear to be running Windows XP 64bit, Windows 2003 Server,
*** Info: or later.  On these systems, it's not possible to use the LocalSystem
*** Info: account for services that can change the user id without an
*** Info: explicit password (such as passwordless logins [e.g. public key
*** Info: authentication] via sshd).

*** Info: If you want to enable that functionality, it's required to create
*** Info: a new account with special privileges (unless a similar account
*** Info: already exists). This account is then used to run these special
*** Info: servers.

*** Info: Note that creating a new user requires that the current account
*** Info: have Administrator privileges itself.

*** Info: No privileged account could be found.

*** Info: This script plans to use 'cyg_server'.
*** Info: 'cyg_server' will only be used by registered services.
*** Query: Do you want to use a different name? (yes/no) no
*** Query: Create new privileged user account 'cyg_server'? (yes/no) yes
*** Info: Please enter a password for new user cyg_server.  Please be sure
*** Info: that this password matches the password rules given on your system.
*** Info: Entering no password will exit the configuration.
*** Query: Please enter the password:
*** Query: Reenter:

*** Info: User 'cyg_server' has been created with password 'Linux123#'.
*** Info: If you change the password, please remember also to change the
*** Info: password for the installed services which use (or will soon use)
*** Info: the 'cyg_server' account.

*** Info: Also keep in mind that the user 'cyg_server' needs read permissions
*** Info: on all users' relevant files for the services running as 'cyg_server'.
*** Info: In particular, for the sshd server all users' .ssh/authorized_keys
*** Info: files must have appropriate permissions to allow public key
*** Info: authentication. (Re-)running ssh-user-config for each user will set
*** Info: these permissions correctly. [Similar restrictions apply, for
*** Info: instance, for .rhosts files if the rshd server is running, etc].


*** Info: The sshd service has been installed under the 'cyg_server'
*** Info: account.  To start the service now, call `net start sshd' or
*** Info: `cygrunsrv -S sshd'.  Otherwise, it will start automatically
*** Info: after the next reboot.

*** Info: Host configuration finished. Have fun!

fht@fht-THINK ~
$
</pre>

注意在 “Enter the value of CYGWIN for the daemon:” 时要输入 “binmode ntsec”


# 4. 在Windows防火墙上开启 SSH服务所需要的 22 号端口

可以通过以下一条命令
<pre>
netsh advfirewall firewall add rule dir=in action=allow localport=22 protocol=tcp name="Cygwin SSHD"
</pre>
开启22号端口。

也可以通过 “控制面板” -> “系统与安全” -> “Windows防火墙”  ->高级设置(在左边栏)”，添加一个新的“入站规则”：

* 规则类型： 选择“端口”
* 协议和端口： 选择“TCP”，选择“特定本地端口”，并输入数字“22”
* 操作：选择“允许连接”
* 配置文件：勾选“域”、“专用” 和 “公用”
* 名称： 输入“Cygwin SSHD”

以上两种方法结果是一样的，任选一种即可。

# 5. 启动 SSHD 服务

在 Cygwin Terminal 中执行：
<pre>
cygrunsrv -S sshd
</pre>
 或
<pre>
sc start sshd
</pre>


# 6. 验证 SSH

从 [PuTTY下载页面](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)下载 [putty.zip](http://the.earth.li/~sgtatham/putty/latest/x86/putty.zip) ，解压后运行 putty.exe 

在“Host Name(or IP address)”中输入“localhost” ，按回车，进入登录页面，输入 Windows 的用户名、密码。正常的话，就应该可以看到登录成功的提示符。


# 7. 创建新用户

通过 “控制面板\用户帐户和家庭安全\用户帐户\管理帐户” 创建一个新的用户，并设置好密码。

然后在 在 Cygwin Terminal 中执行：
<pre>
/bin/mkpasswd -d -u <USER>  >> /etc/passwd 
</pre>

将其中的<USER> 替换成刚才创建的用户名。


通过 putty 登录时，输入新用户名和密码，看看能否访问。

如果新用户不能访问，可能是需要将用户从标准用户（Users）切换成 管理员（Administors）。

# 参考文档

* [5 Installing Cygwin and Starting SSH Daemon](http://docs.oracle.com/cd/E24628_01/install.121/e22624/preinstall_req_cygwin_ssh.htm)
