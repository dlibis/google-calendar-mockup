# Stage 1: Build frontend
FROM node:lts-alpine as frontend

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN yarn build

# Stage 2: Create production-ready image
FROM node:lts-alpine

WORKDIR /app

COPY --from=frontend /app/package.json .
COPY --from=frontend /app/yarn.lock .
COPY --from=frontend /app/public ./public
COPY --from=frontend /app/.next ./.next

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]