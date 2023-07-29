#!/bin/bash

# Check if the image exists
if [[ "$(docker images -q ms_imageservice 2> /dev/null)" != "" ]]; then
    # Delete the existing image
    docker image prune --filter "dangling=true"
    docker rmi ms_imageservice
fi

# Build the image
docker build -t ms_imageservice .

# Print the "Current images: " and list all the images
echo "Current images: "
docker images
