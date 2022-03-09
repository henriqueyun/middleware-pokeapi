FROM node:16-alpine
WORKDIR /app
COPY package*.json /app
COPY ./node_modules /app
RUN npm install
COPY ./*.js /app
CMD npm start
