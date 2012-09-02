---
layout: post
title: Category in github. The semi-automatic way
description: Plugin free, with only a little work to do.
categories: jekyll
tags: [category, github]
copyright: en
---

As we know, [github](http://github.com) doesn't allow us to use plugin in jekyll for security reason. So, here comes the problem. How can we use category?

After some test, I finally find a semi-automatic way to do that. Here's how.

# 1. Add categories in the post
Add keyword <b>categories</b> in the post, like the fellowing:
<pre>
---
layout: post
title: Category in github. The semi-automatic way
categories: jekyll
---
Content of the post.
</pre>

# 2. Add link of categories in index.html
Create a category.html in the _include directory

{% highlight html %}
<div class="box fn-clear">
<h4>Category</h4>
<ul>
    {{ '{%' }} for category in site.categories %}
    <li><a href="/categories/{{ '{{' }} category | first }}/" title="view all posts">{{ '{{' }} category | first }} {{ '{{' }} category | last | size }}</a></li>
    {{ '{%' }} endfor %}
</ul>
</div>
{% endhighlight %}

After that, include category.html in index.html

{% highlight html %}
{{ '{%' }} include category.html %}
{% endhighlight %}

# 3. Create layout file for category index page

Create file <b>category_index.html</b> in _layout directory.

{% highlight html %}
---
layout: default
---
<section class="content">
	<div class="content-cnt fn-clear">
		<div class="main fn-clear">
            <p><center><h3 class="main-excerpt-title">Category: {{ '{{' }} page.category }} </h3></center></p>
			{{ '{%' }} for post in site.categories.[page.category] %}
            <article class="main-excerpt fn-clear">
                <h3 class="main-excerpt-title"><a href="{{ '{{' }} post.url }}" title="{{ '{{' }} post.title }}" rel="bookmark">{{ '{{' }} post.title }}</a></h3>
                <p class="date"><time pubdate="{{ '{{' }} post.date }}">{{ '{{' }} post.date | date_to_string }}</time></p>
                <p>{{ '{{' }} post.description }}</p>
                <p class="more"><a href="{{ '{{' }} post.url }}" title="Read More" rel="nofollow"><span>&#10149;</span>Read More</a></p>
            </article>
            {{ '{%' }} endfor %}
		</div>
	</div>
</section>
{% endhighlight %}

 
# 4. Create index page for each category

For every category, create a sub directory the same name of category in directory 'categories', add create a index page with name <b>index.html</b> in that sub-directory. 

For example, we have a category with name 'jekyll', what we should do is:

{% highlight bash %}
mkdir -p categories/jekyll  # directory for category 'jekyll'
touch categories/jekyll/index.html
{% endhighlight %}

The content of <b>categories/jekyll/index.html</b> is:

{% highlight html %}
---
layout: category_index
category: jekyll
---
{% endhighlight %}

For short, we can execute the fellowing bash, create_category.sh, to create sub-directory & index file.
{% highlight bash %}
#!/bin/bash
for var in "$@"
do
    dir="categories/$var"
    mkdir -p $dir

    file="$dir/index.html"
    cat > $file <<EOL
---
layout: category_index
category: $var
---
EOL
done
{% endhighlight %}

For example:
{% highlight bash %}
./create_category.sh  jekyll
{% endhighlight %}


Still don't know how to do? Just clone [my blog](https://github.com/fanhongtao/fanhongtao.github.com) from github.

# Reference
* [Template Data](https://github.com/mojombo/jekyll/wiki/Template-Data)



