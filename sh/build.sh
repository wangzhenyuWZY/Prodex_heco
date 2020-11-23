#!/bin/sh

yarn build

docker build -t  foxdex/web:latest .

echo "DOCKER_ACCESS_TOKEN"
echo $DOCKER_ACCESS_TOKEN

docker login --username foxdex -p $DOCKER_ACCESS_TOKEN


docker push foxdex/web:latest