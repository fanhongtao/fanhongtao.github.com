#!/usr/bin/env python
# 将 .html 文件压缩成一行。如：
#   ./min.py  page_tag.html  page_category.html
import os
import sys

def min_file(src_file):
    (name,ext) = os.path.splitext(src_file);
    dest_file = name + "_min" + ext;
    print("change [" + src_file + "] to [" + dest_file + "]")
    with open(src_file, 'r') as src:
        list = src.readlines();
    
    with open(dest_file, 'w') as dest:
        for line in list:
            line = line.strip()
            dest.write(line)

# main
for i in range(1, len(sys.argv)):
    min_file(sys.argv[i])

