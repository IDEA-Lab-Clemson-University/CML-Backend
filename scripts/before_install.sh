#!/bin/bash
# scripts/before_install.sh

# Install Node.js v16
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install npm
sudo npm install -g npm