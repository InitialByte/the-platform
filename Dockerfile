FROM alpine:3

LABEL name="The Platform. Docker image." \
      maintainer="Zlobin Eugene <creastar@gmail.com>"

ENV PATH="/opt/gtk/bin:${PATH}"
ENV NGINX_VERSION=1.18.0

RUN GPG_KEYS=B0F4253373F8F6F510D42178520A9993A1C052F8 \
  && CONFIG="\
    --http-client-body-temp-path=/var/cache/nginx/client_temp \
    --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp \
    --http-proxy-temp-path=/var/cache/nginx/proxy_temp \
    --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp \
    --http-scgi-temp-path=/var/cache/nginx/scgi_temp \
    --error-log-path=/var/log/nginx/error.log \
    --http-log-path=/var/log/nginx/access.log \
    --modules-path=/usr/lib/nginx/modules \
    --conf-path=/etc/nginx/nginx.conf \
    --lock-path=/var/run/nginx.lock \
    --pid-path=/var/run/nginx.pid \
    --sbin-path=/usr/sbin/nginx \
    --prefix=/etc/nginx \
    --group=nginx \
    --user=nginx \
    --add-dynamic-module=/usr/src/ngx_http_js/nginx \
    --add-dynamic-module=/usr/src/ngx_headers_more \
    --add-dynamic-module=/usr/src/ngx_brotli \
    --with-cc-opt=-I/usr/src/boringssl/.openssl/include \
    --with-ld-opt=-L/usr/src/boringssl/.openssl/lib \
    --with-http_image_filter_module=dynamic \
    --with-stream_geoip_module=dynamic \
    --with-stream_ssl_preread_module \
    --with-http_geoip_module=dynamic \
    --with-http_random_index_module \
    --with-http_auth_request_module \
    --with-http_xslt_module=dynamic \
    --with-http_gzip_static_module \
    --with-http_secure_link_module \
    --with-http_stub_status_module \
    --with-http_perl_module=dynamic \
    --with-stream_realip_module \
    --with-http_addition_module \
    --with-http_realip_module \
    --with-http_gunzip_module \
    --with-stream_ssl_module \
    --with-http_slice_module \
    --with-http_ssl_module \
    --with-http_sub_module \
    --with-mail_ssl_module \
    --with-http_dav_module \
    --with-http_flv_module \
    --with-http_mp4_module \
    --with-http_v2_module \
    --with-file-aio \
    --with-threads \
    --with-compat \
    --with-stream \
    --with-mail \
  " \
  # ^^^
  # --with-http_v3_module \
  # --with-openssl=/usr/src/quiche/deps/boringssl \
  # --with-quiche=/usr/src/quiche \
  && addgroup -S nginx \
  && adduser -D -S -h /var/cache/nginx -s /sbin/nologin -G nginx nginx \
  && apk add --no-cache --virtual .build-deps \
    ca-certificates \
    linux-headers \
    libxslt-dev \
    build-base \
    bind-tools \
    mercurial \
    geoip-dev \
    libstdc++ \
    autoconf \
    automake \
    binutils \
    zlib-dev \
    pcre-dev \
    perl-dev \
    libc-dev \
    libtool \
    su-exec \
    gd-dev \
    libgcc \
    tzdata \
    gnupg \
    cmake \
    zlib \
    make \
    pcre \
    curl \
    gcc \
    git \
    tar \
    go \
  && curl -fSL https://nginx.org/download/nginx-$NGINX_VERSION.tar.gz -o nginx.tar.gz \
  && curl -fSL https://nginx.org/download/nginx-$NGINX_VERSION.tar.gz.asc  -o nginx.tar.gz.asc \
  && export GNUPGHOME="$(mktemp -d)" \
  && found=''; \
  for server in \
    ha.pool.sks-keyservers.net \
    hkp://keyserver.ubuntu.com:80 \
    hkp://p80.pool.sks-keyservers.net:80 \
    pgp.mit.edu \
  ; do \
    echo "Fetching GPG key $GPG_KEYS from $server"; \
    gpg --keyserver "$server" --keyserver-options timeout=10 --recv-keys "$GPG_KEYS" && found=yes && break; \
  done; \
  test -z "$found" && echo >&2 "error: failed to fetch GPG key $GPG_KEYS" && exit 1; \
  gpg --batch --verify nginx.tar.gz.asc nginx.tar.gz \
  && rm -rf "$GNUPGHOME" nginx.tar.gz.asc \
  && mkdir -p /usr/src \
  \
  && git clone --depth=1 --recursive https://github.com/openresty/headers-more-nginx-module /usr/src/ngx_headers_more \
  && git clone --depth=1 --recursive --shallow-submodule https://github.com/google/ngx_brotli /usr/src/ngx_brotli \
  # && git clone --depth=1 --recursive https://github.com/cloudflare/quiche /usr/src/quiche \
  && hg clone http://hg.nginx.org/njs /usr/src/ngx_http_js \
  && (git clone --depth=1 https://boringssl.googlesource.com/boringssl /usr/src/boringssl \
    && sed -i 's@out \([>=]\) TLS1_2_VERSION@out \1 TLS1_3_VERSION@' /usr/src/boringssl/ssl/ssl_lib.cc \
    && sed -i 's@ssl->version[ ]*=[ ]*TLS1_2_VERSION@ssl->version = TLS1_3_VERSION@' /usr/src/boringssl/ssl/s3_lib.cc \
    && sed -i 's@(SSL3_VERSION, TLS1_2_VERSION@(SSL3_VERSION, TLS1_3_VERSION@' /usr/src/boringssl/ssl/ssl_test.cc \
    && sed -i 's@\$shaext[ ]*=[ ]*0;@\$shaext = 1;@' /usr/src/boringssl/crypto/*/asm/*.pl \
    && sed -i 's@\$avx[ ]*=[ ]*[0|1];@\$avx = 2;@' /usr/src/boringssl/crypto/*/asm/*.pl \
    && sed -i 's@\$addx[ ]*=[ ]*0;@\$addx = 1;@' /usr/src/boringssl/crypto/*/asm/*.pl \
    && mkdir -p /usr/src/boringssl/build /usr/src/boringssl/.openssl/lib /usr/src/boringssl/.openssl/include \
    && ln -sf /usr/src/boringssl/include/openssl /usr/src/boringssl/.openssl/include/openssl \
    && touch /usr/src/boringssl/.openssl/include/openssl/ssl.h \
    && cmake -B/usr/src/boringssl/build -H/usr/src/boringssl -DCMAKE_BUILD_TYPE=RelWithDebInfo \
    && make -C/usr/src/boringssl/build -j$(getconf _NPROCESSORS_ONLN) \
    && cp /usr/src/boringssl/build/crypto/libcrypto.a /usr/src/boringssl/build/ssl/libssl.a /usr/src/boringssl/.openssl/lib/) \
  \
  && tar -zxC /usr/src -f nginx.tar.gz \
  && rm nginx.tar.gz \
  && cd /usr/src/nginx-$NGINX_VERSION \
  # && patch --verbose --dry-run -p01 < /usr/src/quiche/extras/nginx/nginx-1.16.patch \
  && curl -fSL https://raw.githubusercontent.com/nginx-modules/ngx_http_tls_dyn_size/0.5/nginx__dynamic_tls_records_1.15.5%2B.patch -o dynamic_tls_records.patch \
  && patch -p1 < dynamic_tls_records.patch \
  && ./configure $CONFIG --with-debug \
  && make -j$(getconf _NPROCESSORS_ONLN) \
  && mv objs/nginx objs/nginx-debug \
  && mv objs/ngx_http_xslt_filter_module.so objs/ngx_http_xslt_filter_module-debug.so \
  && mv objs/ngx_http_image_filter_module.so objs/ngx_http_image_filter_module-debug.so \
  && mv objs/ngx_stream_geoip_module.so objs/ngx_stream_geoip_module-debug.so \
  && mv objs/ngx_http_geoip_module.so objs/ngx_http_geoip_module-debug.so \
  && mv objs/ngx_http_perl_module.so objs/ngx_http_perl_module-debug.so \
  && ./configure $CONFIG \
  && make -j$(getconf _NPROCESSORS_ONLN) \
  && make install \
  && rm -rf /etc/nginx/html/ \
  && install -m755 objs/nginx-debug /usr/sbin/nginx-debug \
  && install -m755 objs/ngx_http_xslt_filter_module-debug.so /usr/lib/nginx/modules/ngx_http_xslt_filter_module-debug.so \
  && install -m755 objs/ngx_http_image_filter_module-debug.so /usr/lib/nginx/modules/ngx_http_image_filter_module-debug.so \
  && install -m755 objs/ngx_stream_geoip_module-debug.so /usr/lib/nginx/modules/ngx_stream_geoip_module-debug.so \
  && install -m755 objs/ngx_http_geoip_module-debug.so /usr/lib/nginx/modules/ngx_http_geoip_module-debug.so \
  && install -m755 objs/ngx_http_perl_module-debug.so /usr/lib/nginx/modules/ngx_http_perl_module-debug.so \
  && ln -s ../../usr/lib/nginx/modules /etc/nginx/modules \
  && strip /usr/sbin/nginx* \
  && strip /usr/lib/nginx/modules/*.so \
  && rm -rf /usr/src/nginx-$NGINX_VERSION \
  && rm -rf /usr/src/boringssl /usr/src/ngx_* \
  && rm -rf /usr/src/quiche \
  \
  # Bring in gettext so we can get `envsubst`, then throw
  # the rest away. To do this, we need to install `gettext`
  # then move `envsubst` out of the way so `gettext` can
  # be deleted completely, then move `envsubst` back.
  && apk add --no-cache --virtual .gettext gettext \
  && mv /usr/bin/envsubst /tmp/ \
  \
  && runDeps="$( \
    scanelf --needed --nobanner /usr/sbin/nginx /usr/lib/nginx/modules/*.so /tmp/envsubst \
      | awk '{ gsub(/,/, "\nso:", $2); print "so:" $2 }' \
      | sort -u \
      | xargs -r apk info --installed \
      | sort -u \
  ) tzdata ca-certificates" \
  && apk add --no-cache --virtual .nginx-rundeps $runDeps \
  && apk del .build-deps \
  && apk del .gettext \
  && mv /tmp/envsubst /usr/local/bin/ \
  ## Forward request and error logs to docker log collector.
  && ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log

WORKDIR /usr/src/app

## Install yarn v2.
RUN apk add yarn git && \
    yarn policies set-version berry \
    yarn set version berry

## Install dependencies and cache it.
COPY package.json .
COPY src/frontend/react/web-desktop/package.json src/frontend/react/web-desktop/package.json
COPY src/frontend/modules/register/package.json src/frontend/modules/register/package.json
COPY src/frontend/modules/auth/package.json src/frontend/modules/auth/package.json
COPY src/frontend/react/uikit/package.json src/frontend/react/uikit/package.json
COPY src/frontend/core/package.json src/frontend/core/package.json

RUN yarn

COPY configs/docker/nginx/ /etc/nginx/
COPY . .

## Build application and remove sources.
RUN yarn build && \
    rm -rf node_modules && \
    rm -rf configs/docker/consul.d && \
    rm -rf configs/docker/nginx && \
    rm -rf configs/webpack && \
    rm -rf configs/core && \
    rm -f tsconfig.json && \
    rm -rf configs/tyk && \
    rm -f package.json && \
    rm -f .yarnrc.yml && \
    rm -f Dockerfile && \
    rm -f yarn.lock && \
    rm -f .yarnrc && \
    rm -f .pnp.js && \
    rm -rf public && \
    rm -rf .cache && \
    rm -rf report && \
    rm -rf .yarn && \
    rm -rf .git && \
    rm -rf src && \
    chmod +x configs/docker/build.sh

RUN apk del yarn git

RUN rm -rf /usr/share/perl5 \
    rm -rf /usr/lib/perl5 \
    rm -rf /root/.cache \
    rm -rf /lib/apk/db \
    rm -rf /root/.yarn

ARG WORKSTATION
ARG COOKIE_NAME
ARG API_KEY
ARG DOMAIN

ARG MAINTENANCE_MODE_ACTIVE
ARG DEV_CERTIFICATES_ACTIVE

ARG APIGW_PROTOCOL
ARG APIGW_HOST
ARG APIGW_PORT

ARG WS_PROTOCOL
ARG WS_HOST
ARG WS_PORT

ENV WORKSTATION $WORKSTATION
ENV COOKIE_NAME $COOKIE_NAME
ENV API_KEY $API_KEY
ENV DOMAIN $DOMAIN

ENV MAINTENANCE_MODE_ACTIVE $MAINTENANCE_MODE_ACTIVE
ENV DEV_CERTIFICATES_ACTIVE $DEV_CERTIFICATES_ACTIVE

ENV APIGW_PROTOCOL $APIGW_PROTOCOL
ENV APIGW_HOST $APIGW_HOST
ENV APIGW_PORT $APIGW_PORT

ENV WS_PROTOCOL $WS_PROTOCOL
ENV WS_HOST $WS_HOST
ENV WS_PORT $WS_PORT

CMD ["/usr/src/app/configs/docker/build.sh"]
EXPOSE 80 443
