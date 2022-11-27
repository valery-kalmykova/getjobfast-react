FROM node:16-alpine AS builder
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm i
COPY .env ./
COPY ./frontend .
RUN npm run build

FROM nginx:latest AS production
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html/
COPY ./frontend/nginx/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]