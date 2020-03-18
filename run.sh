#!/usr/bin/env bash

# Local variables
X_USER_ID=$(id -u ${USER})
X_USER_GROUP=$(id -g ${USER})
X_PROJ=$(realpath "${BASH_SOURCE%/*}")

# Start container
docker run --rm -d -it \
    -v "$X_PROJ:/app" \
    --workdir /app \
    -p 8001:8001 \
    -p 5861:5858 \
    -u $X_USER_ID:$X_USER_GROUP \
    --env "NODE_ENV=development" \
    --name frontend-interview-test \
    node:lts