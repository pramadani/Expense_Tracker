FROM nginx:alpine

COPY public /usr/share/nginx/html

EXPOSE 80

RUN apk update && \
    apk add --no-cache gettext

COPY nginx.conf /etc/nginx/nginx.conf.template

CMD envsubst '$BACKEND_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'