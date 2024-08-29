FROM node:20-bullseye-slim

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install && yarn global add prisma

COPY . .

EXPOSE 6001

CMD ["yarn", "start:dev"]