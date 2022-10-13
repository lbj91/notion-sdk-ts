FROM node:alpine

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm ci

ENTRYPOINT npm start