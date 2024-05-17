FROM node:latest AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm build

FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
