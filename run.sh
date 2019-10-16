#!/bin/sh
./env.sh

cp env-config.js build

MSG="Install server"
echo "*** $MSG ***"
npm install -g serve
echo "*** Done $MSG ***"

echo "*** Run application ***"
serve -l 3000 -s build