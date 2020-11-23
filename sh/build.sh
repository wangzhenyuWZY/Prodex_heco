#!/bin/sh
ACCESS_TOKEN='7c96ae10-725b-43b5-b163-18e655a65baf'

yarn build

docker build -t  foxdex/web:latest .

docker login --username foxdex -p $ACCESS_TOKEN


docker push foxdex/web:latest