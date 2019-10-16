#!/bin/bash

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment 
echo "window._env_='"${DP_CORE_STAGE}"'" >> ./env-config.js
