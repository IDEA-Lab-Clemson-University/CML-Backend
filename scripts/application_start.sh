#!/bin/bash

# This script is executed during the "ApplicationStart" deployment lifecycle event.

# Navigate to the deployment directory
cd /home/ec2-user/CML-Backend-main

# Start your Node.js application using nodemon
sudo npm  install aws-sdk
sudo npm  install aws-sdk mongoose
sudo npm install -g nodemon
sudo nodemon app &

# You can customize this script based on your specific application requirements

exit 0