FROM node:alpine

ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /webjive
WORKDIR /webjive
COPY . .

RUN npm install

CMD npm start

EXPOSE 3000