#!/bin/bash

# Check if the image exists
if [[ "$(docker images -q aphBlog_wDMePj22 2> /dev/null)" != "" ]]; then
    # Delete the existing image
    docker image prune --filter "dangling=true"
    docker rmi aphBlog_wDMePj22
fi

# Build the image
docker build -t aphBlog_wDMePj22 .

# Print the "Current images: " and list all the images
echo "Current images: "
docker images
