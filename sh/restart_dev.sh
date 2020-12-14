#!/bin/sh

docker login --username foxdex -p $DOCKER_ACCESS_TOKEN

docker rmi -f foxdex/web:dev
docker-compose  -f  docker-compose-dev.yml  pull foxdex

docker-compose -f docker-compose-dev.yml down
docker-compose -f docker-compose-dev.yml up -d
