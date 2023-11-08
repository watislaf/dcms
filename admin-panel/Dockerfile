# Base image
FROM node:18-alpine AS base
RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

ADD .env.production .env
ENV NODE_ENV production
RUN pnpm build:prod
RUN pnpm prune --prod

FROM base AS deploy
WORKDIR /app
COPY --from=build /app/dist/ ./dist/
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
EXPOSE 4173
ENV NODE_ENV production
CMD [ "pnpm", "start:prod" ]
