FROM node:13.12.0-alpine

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

# add app
RUN mkdir src public
COPY ./src /app/src/
COPY ./public /app/public/
COPY ./package.json /app/
COPY ./package-lock.json /app/

RUN npm ci

CMD npm start