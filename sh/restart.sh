#!/bin/sh

docker login --username foxdex -p $DOCKER_ACCESS_TOKEN

docker rmi -f foxdex/web:latest
docker-compose  -f  docker-compose.yml  pull foxdex

docker-compose -f docker-compose.yml down
docker-compose -f docker-compose.yml up -d
