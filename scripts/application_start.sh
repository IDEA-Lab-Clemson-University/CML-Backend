#!/bin/bash

# This script is executed during the "ApplicationStart" deployment lifecycle event.

# Navigate to the deployment directory
cd /home/ec2-user/CML-Backend-main

# Start your Node.js application using nodemon
npm  install aws-sdk
npm  install aws-sdk mongoose
npm install -g nodemon
nodemon app

# You can customize this script based on your specific application requirements

exit 0