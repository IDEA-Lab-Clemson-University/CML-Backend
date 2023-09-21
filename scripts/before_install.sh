#!/bin/bash

#download node and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
npm  install aws-sdk
npm  install aws-sdk mongoose
npm install -g nodemon

#create our working directory if it doesnt exist
DIR="/home/ec2-user/CML-Backend-main/"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi
