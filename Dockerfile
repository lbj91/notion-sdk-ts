FROM node:16-alpine

# WORKDIR /
COPY . /

RUN npm ci

ENTRYPOINT ["npm","run","start"]