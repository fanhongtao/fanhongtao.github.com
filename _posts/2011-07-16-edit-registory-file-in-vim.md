---
layout: post
title: Edit registory file in Vim
categories: software
tags: [vim]
copyright: en
---

Windows registry files (*.REG) are encoded in UTF-16le with BOM. So we need to config vim to read registry files correctly.

Add the following lines to vimrc file.
<pre>
set encoding=utf-8
set fileencodings=ucs-bom,utf-8,cp936
</pre>
Note, the <b>ucs-bom</b> must set before <b>utf-8</b>.

My windows's default language is zh_CN. The setting of encoding to utf-8 will cause vim display message in the wrong way. To solve this problem, set the environment variable <b>LANG</b> to <b>en_US.UTF-8</b>.
<pre>
set LANG=en_US.UTF-8
</pre>


For more details, see <http://vim.wikia.com/Working_with_Unicode>.

 
