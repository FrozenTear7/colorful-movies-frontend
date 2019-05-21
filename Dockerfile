FROM node:11-alpine

WORKDIR /usr/afterimage-frontend

COPY package.json .

RUN npm install

COPY . .