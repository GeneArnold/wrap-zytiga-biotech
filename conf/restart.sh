#!/bin/bash

# usage: ./deploy.sh project-name

if [ ! -z "$1" ]; then
  PROJECT_NAME=$1
  CLONE_NAME=$PROJECT_NAME-clone
else
  echo 'Argument missing. Please include PROJECT_NAME in the command'
  exit 1
fi

if [ -z "$APPLICATION_NAME" ]; then
  APPLICATION_NAME=$NAME-application
fi

if [ ! -z "$AWS_REGION" ]; then
  AWS_REGION=$AWS_REGION
else
  AWS_REGION=us-west-2
fi

if [ -z "$WRAP_APP_URL" ]; then
  WRAP_APP_URL=http://$CLONE_NAME.$AWS_REGION.elasticbeanstalk.com
  HEALTH_PATH="$WRAP_APP_URL/api/health"
fi

# clean old instance
eb terminate $CLONE_NAME

# create clone
# aws elasticbeanstalk create-environment --application-name express-angular-application --environment-name express-angular
eb clone $PROJECT_NAME -n $CLONE_NAME

# wait until clone is fully operational
UNREACHEABLE=1;
start=$(date +'%s')
echo -n "$WRAP_APP_URL is starting up"
while [ $UNREACHEABLE -ne "0" ];
do
  if curl -s --head  --request GET $HEALTH_PATH | grep "200 OK" > /dev/null; then
    echo -ne "\e[0K\r $WRAP_APP_URL is UP"
    UNREACHEABLE=0
  else
    echo -ne "\r $WRAP_APP_URL is starting up. $(($(date +'%s') - $start)) seconds passed."
  fi

  sleep 1;
done

# switch clone to active one
# aws elasticbeanstalk swap-environment-cnames
eb swap $PROJECT_NAME -n $CLONE_NAME

# remove old instance
# aws elasticbeanstalk terminate-environment --environment-name my-env
eb terminate $CLONE_NAME