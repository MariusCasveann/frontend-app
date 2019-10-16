#!/bin/sh

rm -rf nginx.conf
sed -e "s|serverUrl|$1|g" nginx_template.conf > nginx.conf

export MSYS_NO_PATHCONV=1

docker run --rm --name dp-dev-nginx -p 80:80 -p 8080:80 -v ${PWD}/nginx.conf:/etc/nginx/nginx.conf:ro nginx:1.11.8-alpine
