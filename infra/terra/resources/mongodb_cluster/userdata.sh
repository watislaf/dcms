#!/bin/bash

apt-get update

apt-get install gnupg curl

sudo curl -fsSL https://pgp.mongodb.com/server-7.0.asc |  sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg  --dearmor

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list

sudo apt-get update

MONGO_VERSION=7.0.2
apt-get install -y mongodb-org=7.0.2 mongodb-org-database=7.0.2 mongodb-org-server=7.0.2 mongodb-mongosh=2.0.1 mongodb-org-mongos=7.0.2 mongodb-org-tools=7.0.2

# PIN PACKAGE
echo "mongodb-org hold" | dpkg --set-selections
echo "mongodb-org-database hold" | dpkg --set-selections
echo "mongodb-org-server hold" | dpkg --set-selections
echo "mongodb-mongosh hold" | dpkg --set-selectionsbrew services start mongodb-community@4.4
echo "mongodb-org-mongos hold" | dpkg --set-selections
echo "mongodb-org-tools hold" | dpkg --set-selections

sed -i 's/127.0.0.1/0.0.0.0/g' /etc/mongod.conf


systemctl start mongod
