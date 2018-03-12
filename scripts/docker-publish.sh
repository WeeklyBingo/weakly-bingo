DOCKER_ENV=''
DOCKER_TAG=''

case "$TRAVIS_BRANCH" in
  "master")
    DOCKER_ENV=production
    DOCKER_TAG=latest
    ;;
  "develop")
    DOCKER_ENV=development
    DOCKER_TAG=dev
    ;;    
esac

docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD

docker build -f ./Dockerfile.$DOCKER_ENV -t fibon-api:$DOCKER_TAG . --no-cache

docker tag web.api:$DOCKER_TAG $DOCKER_USERNAME/web.api:$DOCKER_TAG

docker push $DOCKER_USERNAME/web.api:$DOCKER_TAG