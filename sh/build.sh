#!/bin/sh
npm install
npm ci
npm test

yarn build:prod

docker build -t  foxdex/web:latest .

docker login --username foxdex -p $DOCKER_ACCESS_TOKEN


docker push foxdex/web:latest