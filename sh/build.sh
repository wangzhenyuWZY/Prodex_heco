#!/bin/sh

yarn build

docker build -t  foxdex/web:latest .

docker login --username foxdex -p $DOCKER_ACCESS_TOKEN


docker push foxdex/web:latest