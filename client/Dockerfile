FROM node:18

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5173

RUN npm run build

CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "5173"]
