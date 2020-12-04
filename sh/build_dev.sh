#!/bin/sh
npm install
npm ci
npm test

yarn build

docker build -t  foxdex/web:dev .

docker login --username foxdex -p $DOCKER_ACCESS_TOKEN


docker push foxdex/web:dev