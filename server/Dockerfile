FROM node:20-alpine3.17

WORKDIR /app/

COPY . .

RUN npm install

RUN npm install -g typescript

EXPOSE 3000

CMD [ "npm", "start" ]