# FROM node:lts-alpine AS build

# WORKDIR /ML-XRay_frontend

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# FROM nginx:stable-alpine as production-stage

# EXPOSE 3000




# FROM node:latest as builder

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# FROM nginx:alpine

# COPY --from=builder /app/dist /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]



FROM node:latest as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

