
echo What should the version be?
read VERSION

docker build -t peterphanouvong/sprt-test:$VERSION .
docker push peterphanouvong/sprt-test:$VERSION
ssh root@134.209.97.7 "docker pull peterphanouvong/sprt-test:$VERSION && docker tag peterphanouvong/sprt-test:$VERSION dokku/test-api:$VERSION && dokku deploy test-api $VERSION"
