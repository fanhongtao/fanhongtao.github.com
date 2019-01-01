---
layout: post
title: 共边比例定理
categories: 几何
tags: [三角形]
copyright: cn
book: 数学瑰宝
---

# 基本命题

设 $\triangle ABC$ 的边 $AB$ 上有一点 $M$，如果有 $AM = \lambda AB$ 或 $\frac{AM}{AB} = \lambda$，则

$$S_{\triangle AMC} = \lambda S_{\triangle ABC}$$

或

$$\frac{S_{\triangle AMC}}{S_{\triangle ABC}} = \lambda = \frac {AM}{AB}$$

<br/><br/>

# 共边比例定理

若直线 $AB$ 与直线 $PQ$ 交于 $M$ ，则

$$\frac{S_{\triangle PAB}}{S_{\triangle QAB}} = \frac {PM}{QM}$$

<!--more-->

## 证明

### 证法1

图形有如下4种情形

|||||
|:--:|:--:|:--:|:--:|
| <img src="{{ "/pic/gongbianbili/a.svg" | prepend:site.baseurl }}"/> |<img src="{{ "/pic/gongbianbili/b.svg" | prepend:site.baseurl }}"/> | <img src="{{ "/pic/gongbianbili/c.svg" | prepend:site.baseurl }}"/> | <img src="{{ "/pic/gongbianbili/d.svg" | prepend:site.baseurl }}"/> |
| (a) | (b) | (c) | (d) |

由基本命题，有

$$S_{\triangle PAM} = \frac{PM}{QM}S_{\triangle QAM}, \quad S_{\triangle PBM} = \frac{PM}{QM}S_{\triangle QBM}$$

同上述两式相加，对于图中 (a), (b) 有

$$\frac{S_{\triangle PAB}}{S_{\triangle QAB}} = \frac{PM}{QM}$$

同上述两式相减，对于图中 (c), (d) 有

$$\frac{S_{\triangle PAB}}{S_{\triangle QAB}} = \frac{PM}{QM}$$

### 证法2

或者在直线 $AB$ 上另取一点 $N$，使 $MN = AB$ ，则

$$\frac{S_{\triangle PAB}}{S_{\triangle QAB}} = \frac{S_{\triangle PMN}}{S_{\triangle QMN}} = \frac{PM}{QM}$$

### 证法3

或者由

$$\frac{S_{\triangle PAB}}{S_{\triangle QAB}} = \frac{S_{\triangle PAB}}{S_{\triangle PMB}} \cdot \frac{S_{\triangle PMB}}{S_{\triangle QMB}} \cdot \frac{S_{\triangle QMB}}{S_{\triangle QAB}} = \frac{AB}{MB} \cdot \frac{PM}{QM} \cdot \frac{MB}{AB} = \frac{PM}{QM}$$

即证。

* content
{:toc}
