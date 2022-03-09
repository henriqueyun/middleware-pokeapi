FROM node:16-alpine
RUN npm install
WORKDIR /app
COPY ./*.js /app
COPY ./node_modules /app
RUN npm start