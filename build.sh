#!/bin/sh
# Dependencies: node (10) & npm

export REACT_APP_STAGE=$DP_CORE_STAGE

npm config set registry https://mediamarktsaturn.jfrog.io/mediamarktsaturn/api/npm/npm/

echo "Installing dependencies..."
npm install

if [ $? -eq 0 ]
then
    echo "**********************************************************"
    echo "Dependencies were installed."
    echo "**********************************************************"
else
    echo "**********************************************************"
    echo "Dependencies could not be installed!" >&2
    echo "**********************************************************"
    exit 1
fi

echo "Generating jest coverage..."
# Exit watch mode after running the tests
export CI=true
npm run test-coverage
unset CI

if [ $? -eq 0 ]
then
    echo "**********************************************************"
    echo "Test run successful"
    echo "**********************************************************"
else
    echo "**********************************************************"
    echo "Test error" >&2
    echo "**********************************************************"
    exit 1
fi

echo "Running build..."
npm run build

if [ $? -eq 0 ]
then
    echo "**********************************************************"
    echo "Webpack build successful"
    echo "**********************************************************"
else
    echo "**********************************************************"
    echo "Webpack build failed" >&2
    echo "**********************************************************"
    exit 1
fi

exit 0
