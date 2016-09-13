#!/bin/bash

# usage: ./deploy.sh staging f0478bd7c2f584b41a49405c91a439ce9d944657

if [ ! -z "$1" ] ; then
  BRANCH=$1
else
  BRANCH=master
fi

if [ ! -z "$2" ]; then
  SHA1=$2
else
  SHA1=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)
fi

if [ ! -z "$AWS_REGION" ]; then
  AWS_REGION=$AWS_REGION
else
  AWS_REGION=us-west-2
fi

if [ ! -z "$AWS_ACCOUNT_ID" ]; then
  AWS_ACCOUNT_ID=$AWS_ACCOUNT_ID
else
  echo "AWS_ACCOUNT_ID missing. \nYou need to provide your AWS account ID without dashes"
  exit 1
fi

if [ ! -z "$PROJECT_NAME" ]; then
  NAME=$PROJECT_NAME
else
  echo "PROJECT_NAME missing. \n Please include PROJECT_NAME in the command"
  exit 1
fi

if [ -z "$APPLICATION_NAME" ]; then
  APPLICATION_NAME=$NAME-application
fi

if [ -z "$WRAP_APP_URL" ]; then
  # WRAP_APP_URL=http://$PROJECT_NAME.$AWS_REGION.elasticbeanstalk.com
  WRAP_APP_URL=""
fi

if [ ! -z "$S3_BUCKET" ]; then
  EB_BUCKET=$S3_BUCKET
else
  EB_BUCKET=docker-beanstalk
fi

if [ -z "$GIT_REPO" ]; then
  echo "GIT_REPO missing. \n Please include GIT_REPO in the command"
  exit 1
fi

if [ -z "$DOCKERRUN_FILE" ]; then
  DOCKERRUN_FILE=Dockerrun.aws.json
fi

if [ -z "$DB_HOST" ]; then
  DB_HOST=db
else
  if [ -z "$DB_DATABASE" ]; then
    echo "DB_DATABASE missing. \n Please include DB_DATABASE in the command"
    exit 1
  fi
fi

if [ -z "$DB_USER" ]; then
  DB_USER=postgres
fi

if [ -z "$DB_PASSWORD" ]; then
  DB_PASSWORD=postgres
fi

if [ -z "$PORT" ]; then
  PORT=9000
fi


VERSION=$BRANCH-$SHA1
DOCKERRUN_TMP=$DOCKERRUN_FILE.tmp
ZIP=$VERSION.gz

# Pull the latest updates
git pull

# aws configure set default.region $AWS_REGION
#
# Authenticate against our Docker registry
eval $(aws ecr get-login)

# Build and push the image
docker build -t $NAME:$VERSION .
docker tag $NAME:$VERSION $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$NAME:$VERSION
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$NAME:$VERSION

cp $DOCKERRUN_FILE $DOCKERRUN_TMP

# Replace the <AWS_ACCOUNT_ID> with the real ID
sed -i='' "s/<AWS_ACCOUNT_ID>/$AWS_ACCOUNT_ID/" $DOCKERRUN_TMP
# Replace the <NAME> with the real name
sed -i='' "s/<NAME>/$NAME/" $DOCKERRUN_TMP
# Replace the <TAG> with the real version number
sed -i='' "s/<TAG>/$VERSION/" $DOCKERRUN_TMP
# Replace the <AWS_REGION> with the AWS region
sed -i='' "s/<AWS_REGION>/$AWS_REGION/" $DOCKERRUN_TMP
# Replace the <GIT_REPO> with the git repository
sed -i='' "s|<GIT_REPO>|$GIT_REPO|" $DOCKERRUN_TMP
# Replace the <DB_HOST> with the db host
sed -i='' "s|<DB_HOST>|$DB_HOST|" $DOCKERRUN_TMP
# Replace the <DB_USER> with the database user
sed -i='' "s|<DB_USER>|$DB_USER|" $DOCKERRUN_TMP
# Replace the <DB_PASSWORD> with the database user password
sed -i='' "s|<DB_PASSWORD>|$DB_PASSWORD|" $DOCKERRUN_TMP
# Replace the <DB_DATABASE> with the database name
sed -i='' "s|<DB_DATABASE>|$DB_DATABASE|" $DOCKERRUN_TMP
# Replace the <PORT> with the port
sed -i='' "s|<PORT>|$PORT|" $DOCKERRUN_TMP
# Replace the <WRAP_APP_URL> with the wrap app url
sed -i='' "s|<WRAP_APP_URL>|$WRAP_APP_URL|" $DOCKERRUN_TMP

# Zip up the Dockerrun file (feel free to zip up an .ebextensions directory with it)
gzip < "$DOCKERRUN_TMP" > $ZIP

aws s3 cp $DOCKERRUN_TMP s3://$EB_BUCKET/$ZIP

# Create a new application version with the zipped up Dockerrun file
aws elasticbeanstalk create-application-version \
    --application-name $APPLICATION_NAME \
    --version-label $VERSION \
    --source-bundle S3Bucket=$EB_BUCKET,S3Key=$ZIP

# Update the environment to use the new application version
aws elasticbeanstalk update-environment \
      --environment-name $NAME \
      --version-label $VERSION

rm $ZIP
rm $DOCKERRUN_TMP
