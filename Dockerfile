FROM node:7.7.2-alpine

RUN apk --no-cache update

RUN apk --no-cache add apache2-utils

RUN mkdir -p /app/

WORKDIR /app/

COPY package.json /app/

RUN npm install

COPY . /app/

EXPOSE 3000

CMD ["/bin/sh"]
