FROM node:16 as build

# Create and define the node_modules's cache directory.
RUN mkdir /usr/src/cache
WORKDIR /usr/src/cache

# Install the application's dependencies into the node_modules's cache directory.
COPY package.json ./

RUN npm install

WORKDIR /app

EXPOSE 3000

RUN npm install pm2 -g \
    && npm install -g ts-node

CMD ["sh", "/app/entrypoint.sh"]
