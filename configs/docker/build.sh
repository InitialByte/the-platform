#!/bin/sh
EMPTY=""

APIGW_PROTOCOL="${APIGW_PROTOCOL:-http}"
APIGW_HOST="${APIGW_HOST}"
APIGW_PORT="${APIGW_PORT}"

WS_PROTOCOL="${WS_PROTOCOL:-http}"
WS_HOST="${WS_HOST}"
WS_PORT="${WS_PORT}"

WORKSTATION="${WORKSTATION:-client}"
COOKIE_NAME="${COOKIE_NAME:-JWT_ID}"
API_KEY="${API_KEY:-0000000}"

MAINTENANCE_MODE='include ./settings/maintenance.conf;'
DEV_CERTIFICATES='include ./settings/certificates.conf;'

# DOMAIN=$(cat /etc/resolv.conf | grep search | awk '{print $2}' | awk '{print $1}')
RESOLVER=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}' | head -n 1)
DOMAIN="${DOMAIN:-localhost}"

if [[ "$MAINTENANCE_MODE_ACTIVE" != 1 ]]; then
  MAINTENANCE_MODE=$EMPTY
fi

if [[ "$DEV_CERTIFICATES_ACTIVE" != 1 ]]; then
  DEV_CERTIFICATES=$EMPTY
fi

export APIGW_PROTOCOL APIGW_HOST APIGW_PORT WS_PROTOCOL WS_HOST WS_PORT COOKIE_NAME IS_DEV WORKSTATION API_KEY DEV_CERTIFICATES RESOLVER DOMAIN MAINTENANCE_MODE

envsubst '${APIGW_PROTOCOL} ${APIGW_HOST} ${APIGW_PORT} ${WS_PROTOCOL} ${WS_HOST} ${WS_PORT} ${COOKIE_NAME} ${DOMAIN} ${MAINTENANCE_MODE}' \
  < /etc/nginx/settings/location.conf \
  > /tmp/buffer && \
mv /tmp/buffer /etc/nginx/settings/location.conf

envsubst '${WORKSTATION} ${RESOLVER} ${API_KEY}' \
  < /etc/nginx/settings/proxy.conf \
  > /tmp/buffer && \
mv /tmp/buffer /etc/nginx/settings/proxy.conf

envsubst '${DEV_CERTIFICATES}' \
  < /etc/nginx/settings/server.conf \
  > /tmp/buffer && \
mv /tmp/buffer /etc/nginx/settings/server.conf

rm -rf /usr/src/app/configs

echo "The Platform. Ready to go."
nginx -g "daemon off;"

echo quit
