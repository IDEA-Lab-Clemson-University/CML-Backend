#!/bin/bash
# scripts/after_install.sh

# Install project dependencies
cd /home/ec2-user/CML-Backend
npm install --save

# Create and populate the .env file
echo "mongodb+srv://idealab:Clem%240n%21de%40@cluster0.4t0cj04.mongodb.net/spotagency_5" > .env