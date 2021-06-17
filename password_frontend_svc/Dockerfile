FROM node:16-alpine

WORKDIR /api

COPY package.json package-lock.json  ./

RUN npm install --production

COPY ./dist ./dist


EXPOSE 3000

CMD npm run start
