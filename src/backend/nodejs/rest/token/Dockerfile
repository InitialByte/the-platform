FROM node:14-alpine

WORKDIR /usr/src/app

## Install yarn v2.
RUN apk add yarn && \
  yarn set version berry && \
  yarn policies set-version latest

COPY package.json .
RUN yarn

COPY . .

CMD ["yarn", "start"]
