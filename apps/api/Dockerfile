FROM node:21-alpine as build

WORKDIR /app

COPY . ./

RUN yarn install

RUN yarn build

# RUN find . -mindepth 1 ! -name '.build' ! -name 'package*.json' -exec rm -rf {} +

EXPOSE 3000/tcp
EXPOSE 3000/udp

CMD [ "yarn","docker:start" ]