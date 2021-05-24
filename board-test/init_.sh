#!/bin/bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash - 
sudo apt update && sudo apt-get install -y nodejs 
sudo npm install express express-generator mariadb body-parser ejs
sudo npm link express mariadb body-parser ejs