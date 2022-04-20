FROM node:16.14.2-alpine

ENV TZ=Asia/Seoul

WORKDIR /app

COPY ./package.json yarn.lock tsconfig.json tsconfig.build.json ./

RUN yarn

COPY ./src ./src

RUN yarn build

ENTRYPOINT [ "yarn", "start:prod" ]
