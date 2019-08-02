---
layout: post
title: Docker简介
description:  简单介绍Docker的使用
categories: software
tags: [docker, jekyll]
copyright: cn
---

# 1 基本概念

使用之前，先了解[Docker 架构](https://www.runoob.com/docker/docker-architecture.html)。

* Docker 镜像(Images) : Docker 镜像是用于创建 Docker 容器的模板。
* Docker 容器(Container) : 容器是独立运行的一个或一组应用。

Docker 将相关的文件（如：下载的镜像、创建的容器）保存在目录 `/var/lib/docker` ，如果卸载Docker，需要手工删除该目录。

| 子目录名 | 初始为空目录| 用途 |
|:---|:---|:---|
| builder | No | |
| buildkit | No | |
| containers | Yes | 创建的容器 |
| image | No | 镜像相关的信息（如：sha摘要） |
| network | No | |
| overlay2 | No | 镜像的具体内容 和 容器的具体内容 |
| plugins | No | |
| runtimes | Yes | |
| swarm | Yes | |
| tmp | Yes | |
| trust | Yes | |
| volumes | No | 容器运行时由应用产生的数据。|

* 在下载（或创建）镜像时，会将镜像中的文件拷贝到 `overlay2` 的某一个子目录下。
* 在创建容器时，又会将镜像中相关文件拷贝到 `overlay2` 的某一个子目录下。（这一步可能是考虑到：容器运行时可能会对文件进行修改）。
* 执行 `docker container prune` 会删除 `containers` 和 `overlay2` 目录下的内容，但无法删除 `volumes` 中的数据。这也好理解，前两个目录是容器自身的数据，而`volumes`是由容器运行时，其内的应用生成的数据。需要通过 `docker volume prune` 删除相关的数据。


# 2 安装及卸载 Docker

安装方法（步骤）：

* [Get Docker Engine - Community for Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
* [Ubuntu Docker 安装](https://www.runoob.com/docker/ubuntu-docker-install.html)

为了不 `sudo` 运行 `docker` ， 可以[将当前用户加入 docker 用户组](https://docs.docker.com/install/linux/linux-postinstall/)：

```
sudo groupadd docker
sudo usermod -aG docker $USER
```

重新登录后，就可以直接使用 `docker` 命令了。


卸载 Docker：

```
sudo apt-get purge docker-ce docker-ce-cli containerd.io
sudo rm -rf /var/lib/docker
```

# 3 常用命令

`docker --help` 可以查看到，docker命令分为 `Management Commands` 和 `Commands`。我的理解是：
* `Management Commands` 是将命令按用途进行分类，然后再提供相应的子命令。
* `Commands` 是为了使用方便，对 `Management Commands` 中的部分子命令进行了简化。如： `docker create` 是 `docker container create` 的简化形式，`docker start`, `docker stop`, `docker rm` 这些命令也是如此。


| 命令 | 功能 |
|:---|:---|
| help | 查看帮助 |
| search | 在 [Docker Hub](https://hub.docker.com) 搜索镜像 |
| pull | 下载镜像 |
| images | 列出本地的镜像 |
| create | 创建一个新容器 |
| ps | 列出容器（默认仅列出正在运行的容器，通过 `-a`参数可列出全部容器） |
| run | 在新容器里执行命令（每执行一次就会先创建一个新的容器） |
| container prune | 删除所有已经停止的容器 |
| rm | 删除容器。通过 `-v` 参数删除关联的 volumes 。 |
| diff | 查看容器中那些文件有变化 |
| inspect | 查看 Docker 对象（如：容器、volume）的底层信息 |

* `search` 只能搜索到镜像名称，没有办法更进一步列出镜像的版本（Tag），只能通过访问[Docker Hub](https://hub.docker.com)  来查找详细的版本号。
* 为了维护上的方便，给需要经常使用的容器指定一个好记忆的名字（在 `create` 或 `run` 中通过参数 `--name` 指定）。 


清除容器及容器运行时产生的数据

```
docker container prune -f
docker volume prune -f
```


# 4 使用 GitHub Pages 的 Docker

## 4.1 下载镜像

* `docker search github-pages` 查询 GitHub Page 相关的镜像
* `docker pull starefossen/github-pages:172` 下载由 starefossen 提供的 [github-pages镜像](https://hub.docker.com/r/starefossen/github-pages) Tag 为 `172` 的版本。（如果命令中不带 `:172` ，则会下载最新版本）
* `docker images` ： 检查已经下载的镜像

## 4.2 单次运行模式

当只是在容器内执行命令，并不考虑多次执行时命令之间的关系，则可以使用音次运行模式。

在一个GitHub Page的目录下，执行如下命令：

```
docker run -i -t --rm -v "$PWD":/usr/src/app -p 4000:4000 starefossen/github-pages:172
```

参数说明：
* `-i` : Keep STDIN open even if not attached
* `-t` : Allocate a pseudo-TTY，以便可以通过 ctrl-c 终止 Jekyll (也即终止容器执行)
* `--rm` ： docker 退出时，删除容器（Container）和 volume 。
* `-v "$PWD":/usr/src/app` ： 将主机的 `当前目录` 映射为容器的 `/usr/src/app`，以便容器能访问主机上的文件。冒号（:）之前是主机的文件，之后是容器内部的文件。
* `-p 4000:4000` ： 将主机端口4000，映射到容器内部端口4000，以便主机（或其它机器）能访问容器的端口。冒号（:）之前是主机的端口，之后是容器的端口。


## 4.3 重复运行模式

### 4.3.1 创建容器

在一个GitHub Page的目录下，执行如下命令创建容器：

```
docker create --name github -v "$PWD":/usr/src/app -p 4000:4000 starefossen/github-pages:172
```

参数说明：
* `-d` : 让容器在后台运行。
* `--name github` : 将容器命名为 `github`。命名是为了方便管理。


也可以直接通过 `run` 来创建并执行一个容器：

```
docker run -d --name github -v "$PWD":/usr/src/app -p 4000:4000 starefossen/github-pages:172
```
相当于执行了 `docker create` 和 `docker start`。

### 4.3.2 运行容器

* `docker start github`  ： 启动名为 `github` 的容器
* `docker stop github` : 停止名为 `github` 的容器

### 4.3.3 删除容器

* `docker rm -v github` : 删除名为 `github` 的容器（`-v`参数表示同时删除关联的 volumes）

-

* content
{:toc}
