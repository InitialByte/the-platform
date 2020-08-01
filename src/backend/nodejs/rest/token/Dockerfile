FROM node:14-alpine

WORKDIR /usr/src/app

## Install yarn v2.
RUN apk add yarn && \
    yarn policies set-version berry \
    yarn set version berry

COPY package.json .
RUN yarn

COPY . .

CMD ["yarn", "start"]
