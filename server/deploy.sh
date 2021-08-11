#!/bin/bash


echo What should the version be?
read VERSION

docker build -t peterphanouvong/sprt:$VERSION .
docker push peterphanouvong/sprt:$VERSION
ssh root@128.199.115.97 "docker pull peterphanouvong/sprt:$VERSION && docker tag peterphanouvong/sprt:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
