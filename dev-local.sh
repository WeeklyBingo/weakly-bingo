docker-compose -f docker-compose.external.yml up -d --build
npm run start:watch
docker-compose -f docker-compose.external.yml down
