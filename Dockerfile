FROM node:latest AS base
WORKDIR /app
EXPOSE 3000

FROM node:latest AS build
COPY . .
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production 

FROM build AS publish
RUN npm run prestart:prod

FROM base AS final
ENTRYPOINT ["npm", "run start:prod"]

