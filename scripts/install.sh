#!/bin/bash

echo "Installing dependencies"
   sudo apt-get -y install npm && sudo npm -g i n pm2 && n latest && sudo npm -g i npm && sudo npm up -g


# install a server
cd '../server' && echo $(pwd) && npm install


# install a client
cd '../client' && echo $(pwd) && npm install && npm run build
