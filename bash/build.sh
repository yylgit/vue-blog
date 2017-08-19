#!/bin/bash

# npm install 

npm run build

pm2 startOrGracefulReload ./server/pm2.json --env production
