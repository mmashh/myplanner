# Stage 1 - build react app
FROM node:13.12.0-alpine AS builder
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app
RUN mkdir src public
COPY ./src /app/src/
COPY ./public /app/public/
COPY ./package.json ./package-lock.json /app/
RUN npm ci && npm run build

# Stage 2 - build ngnix with react build files
FROM nginx:1.17.8-alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
