FROM node:lts-alpine AS build

WORKDIR /modcampaign-frontend-web

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine as production-stage

EXPOSE 3000
