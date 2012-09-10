---
layout: post
title: Visit Images In Imgur
description:  How to visit images in imgur by a Python script.
categories: jekyll
tags: [jekyll, python]
copyright: en
---

Since [Github](http://github.com) only provide 300M free size to an account, I use [imgur](http://imgur.com) as a image server for my blog.

But imgur will delete images if no one visit them for 6 months. So, it is a good idea to visit images used by blog occasionally.

Here is Python script, which can parse the posts and visit images. You can [download it](/visit_image_in_imgur.py) into the base directory of your Jekyll site & execute it every month.

Beacuse the script save the downloaded images into <b>_temp</b>, you'd better add the fellowing line to your .gitignore 
<pre>
_temp/
</pre>
