---
layout: post
title: 利用apache反向代理功能实现负载均衡的集群
categories: software
tags: [apache]
copyright: cn
---

* content
{:toc}

# 1 目标组网

一个apache机器，带多个Tomcat机器。

将DNS域名解析的IP设置为apache所在机器IP，将所有请求路由到apache上。

用户只看到一个域名，感觉不到apache后面的Tomcat。

如：apache所在机器对应的域名为 http://www.foo.com ，Tomcat所在机器对应的域名可能是  http://www.backend.com，或者干脆没有对应的域名（如：内网的服务器）。用户访问  http://www.foo.com 时，虽然是Tomcat在提供服务，用户在浏览器地址栏上看到的域名还是  http://www.foo.com 。


# 2 配置apache

## 2.1 conf/httpd.conf 文件

conf/httpd.conf 是apache的主配置文件 。

### 2.1.1 加载proxy相关的模块

将proxy相关的模块的注释去掉

<pre>
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_ajp_module modules/mod_proxy_ajp.so
LoadModule proxy_balancer_module modules/mod_proxy_balancer.so
LoadModule proxy_http_module modules/mod_proxy_http.so
</pre>

另外还有connect（用于配合实现SSL）、ftp等相关模块，可以根据情况放开。

关于Proxy的配置说明，可以参见Apache的在线帮助文档[
http://httpd.apache.org/docs/2.2/mod/mod_proxy.html](http://httpd.apache.org/docs/2.2/mod/mod_proxy.html)

### 2.1.2 加载统计相关的模块

将统计模块的注释去掉

<pre>
LoadModule status_module modules/mod_status.so
</pre>

这是为了执行 http://localhost/server-status 查看统计信息的。如果不需要查看统计信息，也可以保持原有的注释。

### 2.1.3 增加引用 proxy的配置文件 

在 httpd.conf 文件结尾处增加如下行：

<pre>
Include conf/myproxy.conf
</pre>

虽然可以将Proxy相关的配置项直接写在 httpd.conf 中，但这样不利于后期的维护，最好还是分开配置。

## 2.2 conf/myproxy.conf 文件

反向Proxy支持 HTTP、AJP等协议，下面分情况进行说明。

### 2.2.1 使用HTTP协议

如果想采用HTTP协议，可以如下配置

<pre>
ProxyRequests  off

ProxyPass / balancer://mycluster/ stickysession=JSESSIONID|jsessionid nofailover=On
ProxyPassReverse / balancer://mycluster/
<Proxy balancer://mycluster>
    BalancerMember http://10.137.10.12:9101  route=tomcat1 keepalive=on
    BalancerMember http://10.137.10.12:9201  route=tomcat2 keepalive=on
    BalancerMember http://10.138.10.34:8080  route=tomcat3 keepalive=on
</Proxy>
</pre>

通过 ProxyPass 将所有请求都转发到集群balancer://mycluster

而 BalancerMember  则定义了集群中的每个成员，配置时除了直接使用IP地址外，也可以配置成域名。如果需要将各成员的负载配置成不同，则需要使用loadfactor参数。如：

<pre>
BalancerMember http://10.137.10.12:9101 loadfactor=7
</pre>

这里配置的端口是Tomcat中 <Connector port="9101" protocol="HTTP/1.1" 的端口。

# 2.2.2 使用AJP协议

如果想采用AJP协议，可以如下配置

<pre>
ProxyRequests  off

ProxyPass / balancer://mycluster/ stickysession=JSESSIONID|jsessionid nofailover=On
ProxyPassReverse / balancer://mycluster/
<Proxy balancer://mycluster>
    BalancerMember ajp://10.137.10.12:9109  route=tomcat1 keepalive=on
    BalancerMember ajp://10.137.10.12:9209  route=tomcat2 keepalive=on
    BalancerMember ajp://10.138.10.34:8009  route=tomcat3 keepalive=on
</Proxy>
</pre>

和HTTP的配置区别只是BalancerMember中指定的协议类型（及对应Tomcat的端口）不同。

这里配置的端口是Tomcat中 <Connector port="9109" protocol="AJP/1.3"  的端口。

### 2.2.3 添加用于维护的配置项

下面的配置项是为了执行 http://localhost/balancer-manager 和 http://localhost/server-status 才添加的。<b>只能在测试环境中才配置。不能在生产环境中配置。</b>

在 myproxy.conf 文件头的位置增加以下配置项：

<pre>
<Location /server-status>
    SetHandler server-status
    Order Deny,Allow
    Deny from all
    Allow from localhost
</Location>

<Location /balancer-manager>
    SetHandler balancer-manager
    Order Deny,Allow
    Deny from all
    Allow from localhost
</Location>

ProxyPass /balancer-manager !
ProxyPass /server-status !
</pre>

ProxyPass /balancer-manager ! 表示对地址 /balancer-manager 不进行Proxy操作，即：总是由apache自己来提供服务。

由于 mod_proxy 模块是按照配置的先后顺序来比较的，而请求  /balancer-manager 也满足ProxyPass / balancer://mycluster/。如果将配置放在文件尾，请求会被Tomcat执行，从而得到一个 404 错误。

# 3 配置Tomcat

## 3.1　conf/server.xml文件

下面只将 conf/server.xml 文件中需要修改的配置项标识出来。

{% highlight xml %}
<Server port=”9105” shutdown=”SHUTDOWN">
    <Connector port="9101" protocol="HTTP/1.1" 
               connectionTimeout="20000" 
               redirectPort="8443" URIEncoding="UTF-8"
               useBodyEncodingForURI="true"/>

    <Connector port="9109" protocol="AJP/1.3" redirectPort="8443" />

    <Engine name="Catalina" defaultHost="localhost" jvmRoute="tomcat1"> 

{% endhighlight %}

其中，如果在一台机器上部署多个Tomcat，需要修改各port项的值，确保每个Tomcat都使用自己的一套Port。如果每台机器上只联署一个Tomcat，则可以不用修改port项。

jvmRoute="tomcat1" 中的tomcat1需要与BalancerMember中的route命名保持一致。

## 3.2 cluster_test.jsp文件 

在 webapps\ROOT\ 目录下，创建一个用于测试集群是否配置成功的文件 cluster_test.jsp

{% highlight jsp %}
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Cluster App Test</title>
</head>
<body>
<%
    out.println("<p>Server Info: "+ request.getLocalAddr() + " : " + request.getLocalPort()+"</p>");
    out.println("<p>Session ID: " + session.getId()+"</p>");

    String dataName = request.getParameter("dataName");
    if (dataName != null && dataName.length() > 0)
    {
        String dataValue = request.getParameter("dataValue");
        session.setAttribute(dataName, dataValue);
    }

    out.println("<p>Session attribute list:<br>");
    out.println("<table border=\"1\">");
    out.println("<tr><th>Name</th><th>Value</th></tr>");
    Enumeration e = session.getAttributeNames();
    while (e.hasMoreElements())
    {
        String name = (String)e.nextElement();
        String value = session.getAttribute(name).toString();
        out.println("<tr><td>" + name + "</td><td>" + value + "</td></tr>");
    }
    out.println("</table></p>");
%>
    <form action="cluster_test.jsp" method="POST">
        Name:<input type=text size=20 name="dataName"> <br>
        Value:<input type=text size=20 name="dataValue"> <br>
        <input type=submit>
    </form>
    <p><img id="test" src="tomcat-power.gif"/></p>
</body>
</html>
{% endhighlight %}

# 4 测试

依次启动各Tomcat 、apache 之后 ，使用 http://localhost/cluster_test.jsp 进行访问。

测试时可以多开几个浏览器，如：开一个IE、一个FireFox、一个Chrome。这样每个浏览器会被分配到不同的Tomcat上。

如果配置了“加载统计相关的模块”和“添加用于维护的配置项”，则可以访问http://localhost/balancer-manager 和 http://localhost/server-status 查看集群的运行情况。
