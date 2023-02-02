FROM node:16.15

#RUN mkdir -p /usr/src/app

#WORKDIR /usr/src/app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]