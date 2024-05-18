# FROM node:lts-alpine AS build

# WORKDIR /ML-XRay_frontend

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# FROM nginx:stable-alpine as production-stage

# EXPOSE 3000




# FROM node:latest as builder

# WORKDIR /frontend

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# FROM nginx:alpine

# COPY --from=builder /frontend/dist /usr/share/nginx/html

# # EXPOSE 3000

# # # CMD ["nginx", "-g", "daemon off;"]

# # Expose port 80
# EXPOSE 3000

# # Start Nginx
# # CMD ["nginx", "-g", "daemon off;"]



FROM node:lts-alpine AS build
WORKDIR /modcampaign-frontend-web
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=build /modcampaign-frontend-web/dist /usr/share/nginx/html
EXPOSE 3000