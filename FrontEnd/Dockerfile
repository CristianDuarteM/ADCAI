# FROM node:18-alpine as build-step

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

#Segunda etapa

FROM nginx:alpine

COPY /dist/adcai /usr/share/nginx/html
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf