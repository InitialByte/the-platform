#!/bin/sh

POSTGRES_NAME="${POSTGRES_NAME}"
POSTGRES_PORT=${POSTGRES_PORT}

REDIS_NAME="${REDIS_NAME}"
REDIS_PORT=${REDIS_PORT}

export POSTGRES_NAME POSTGRES_PORT REDIS_NAME REDIS_PORT

envsubst '${POSTGRES_NAME} ${POSTGRES_PORT}' \
  < /usr/src/app/postgres.json \
  > /tmp/buffer && \
mv /tmp/buffer /usr/src/app/postgres.json

envsubst '${REDIS_NAME} ${REDIS_PORT}' \
  < /usr/src/app/redis.json \
  > /tmp/buffer && \
mv /tmp/buffer /usr/src/app/redis.json

curl --request PUT --data @postgres.json http://${SERVICE_DISCOVERY_HOST}:${SERVICE_DISCOVERY_PORT}/v1/catalog/register
curl --request PUT --data @redis.json http://${SERVICE_DISCOVERY_HOST}:${SERVICE_DISCOVERY_PORT}/v1/catalog/register
