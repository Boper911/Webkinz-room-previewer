FROM node:18-alpine

RUN mkdir /home/node/app/

WORKDIR /home/node/app

COPY ./app/package.json ./
COPY ./app/yarn.lock ./
RUN yarn install

COPY ./app/*.config* ./
COPY ./app/api ./api
COPY ./app/components ./components
COPY ./app/pages ./pages
COPY ./app/public ./public
COPY ./app/styles ./styles

EXPOSE 3000

CMD ["yarn", "run", "dev"]