#!/bin/sh

docker login --username foxdex -p $DOCKER_ACCESS_TOKEN

docker pull foxdex/web:latest

