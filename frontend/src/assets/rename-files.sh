#!/bin/bash

# Recursively find every file from the current directory
find . -type f | while read file; do
    # Get the directory name
    dir=$(dirname "$file")
    # Get the base name and change spaces to hyphen, convert to lowercase
    base=$(basename "$file" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')
    # If the new name is different, rename the file
    if [ "$file" != "$dir/$base" ]; then
        mv -v "$file" "$dir/$base"
    fi
done
