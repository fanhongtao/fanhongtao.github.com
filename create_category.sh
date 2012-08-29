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

