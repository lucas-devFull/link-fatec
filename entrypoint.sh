#!/bin/bash

cp -r /usr/src/cache/node_modules/. /app/node_modules/

pm2-runtime start "bash -c 'yarn start'"
