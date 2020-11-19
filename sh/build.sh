#!/bin/sh
ACCESS_TOKEN='foxdex'

docker build -t  foxdex/web:latest .

docker login --username foxdex -p $ACCESS_TOKEN


docker push foxdex/web:latest