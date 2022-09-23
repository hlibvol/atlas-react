#!/bin/bash

# Exit in case of error
set -e

docker-compose down

docker-compose build

docker-compose up -d