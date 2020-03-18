#!/usr/bin/env bash

X_EXEC_COMMAND=$@
if [[ "$X_EXEC_COMMAND" == "" ]]
then
    X_EXEC_COMMAND=bash
fi

# Attach to container
docker exec -it frontend-interview-test $X_EXEC_COMMAND