#!/usr/bin/env python

import glob
import os
from urllib import urlretrieve

# parse image's url from .md file, and return urls as a list
# Return an empty list if no image's url was found
def parse_img_url(content):
    urls=[]
    start = -1
    while True:
        start = content.find('<img', start + 1)
        if (start == -1):
            break
        end = content.find('/>', start)
        if (end == -1):
            break
        src_begin = content.find('src="', start, end)
        if (src_begin == -1):
            continue
        src_end = content.find('"', src_begin + 5, end)
        if (src_end == -1):
            continue
        url = content[src_begin+5:src_end]
        if (url.find("imgur.com") != -1):
            urls.append(url)
        
    return urls

# download a image from the specified url
def download_img(url, folder):
    file_name = folder + url[url.rfind('/'):]
    print "\t Downloading", url, "into file:", file_name
    urlretrieve(url, file_name)


# main
dir="_temp"
if not os.path.exists(dir):
    print "create dir:", dir
    os.makedirs(dir)
file_list = glob.glob('_posts/*.md')
for file_name in file_list:
    print file_name
    with open(file_name, 'r') as f:
        content = f.read()
        urls = parse_img_url(content)
        for url in urls:
            download_img(url, dir)
