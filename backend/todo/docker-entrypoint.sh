#!/bin/bash

set -e

echo "Running database migrations"
yarn migrate

echo "Running database migrations"
yarn seed

# echo "Running Unit Tests"
# yarn test

echo "Starting server"
yarn start
