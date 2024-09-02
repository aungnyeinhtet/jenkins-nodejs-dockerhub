FROM node:20-bullseye-slim

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install && yarn global add prisma

COPY prisma ./prisma
COPY . .

RUN prisma generate
EXPOSE 3000

CMD ["yarn", "start:dev"]