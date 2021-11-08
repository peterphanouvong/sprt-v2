#!/bin/bash


echo What should the version be?
read VERSION

docker build -t peterphanouvong/sprtv2:$VERSION .
docker push peterphanouvong/sprtv2:$VERSION
ssh root@128.199.201.202 "docker pull peterphanouvong/sprtv2:$VERSION && docker tag peterphanouvong/sprtv2:$VERSION dokku/sprtv2:$VERSION && dokku deploy sprtv2 $VERSION"
