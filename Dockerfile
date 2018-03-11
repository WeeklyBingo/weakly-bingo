FROM node:latest AS base
WORKDIR /app
EXPOSE 3000
COPY package.json .
COPY package-lock.json .

FROM node:latest AS build
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production 

FROM build AS publish
COPY . .
RUN npm run prestart:prod

FROM base AS final
ENTRYPOINT ["npm", "run start:prod"]

