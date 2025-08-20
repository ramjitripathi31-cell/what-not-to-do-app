# Stage 1: Build the app
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 👇 explicitly set NODE_ENV so Vite picks the right env file
ENV NODE_ENV=production

# 👇 tell Vite to load .env.prod
RUN cp .env.production .env

RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
