#!/bin/bash

# Check whether user had supplied -h or --help . If yes display usage of this script.
if [[ ( $@ == "--help") ||  $@ == "-h" ]]
then
    echo "Usage: $0 [MICRO-SERVICE_DIR_NAME1 MICRO-SERVICE_DIR_NAME2 ...]"
    echo "  If no micro-service directory name is given, stop any running Node.js programm, then run all of the backend"
    echo "  If 1+ micro-service directory names are given, run the corresponding micro-services and their docker containers (first, make sure the micro-services are not already running)"
    exit 0
fi

# Check if any micro-service directory name has been passed as arguments of this script
if [  $# -eq 0 ]
then
    # if no arguments, run all the pieces of the backend
    ALL_BACKEND_PARTS="users post profile_picture gateway"
    # Stop all pieces of the backend (and any other running Node.js program, if any)
    echo "STEP 1: Stopping all running Node.js programs, if any"
    killall -q node
else
    # if some arguments given, assume they are a space-separated list of names of backend pieces
    ALL_BACKEND_PARTS=$@
    echo "STEP 1: do nothing"
fi

# Find the path of the root of a global alumni project (where this script should be placed)
#SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )



# Start all docker containers
echo "STEP 2: To start the docker containers, type your sudo password below :"
for BACKEND_PART in $ALL_BACKEND_PARTS
do
    if [ $BACKEND_PART != "gateway" ] # Do not try to run a docker container for the gateway
    then
        sudo docker compose -f $BACKEND_PART/docker/docker-compose.yml up -d
    fi
done

# Start all the pieces of the backend (i.e. the gateway and the follwing micro-services: users, profile_picture,post)
echo "STEP 3: Starting in different terminal tabs, all the follwing pieces of the backend: $ALL_BACKEND_PARTS"
for BACKEND_PART in $ALL_BACKEND_PARTS
do
    gnome-terminal --tab -- bash -c "cd $BACKEND_PART/ && echo 'Starting micro-service $BACKEND_PART' && npm run start:dev; exec bash"
done
