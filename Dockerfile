FROM node:16 as build

WORKDIR /app
COPY ./package.json /package.json
RUN yarn install --no-lockfile
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
