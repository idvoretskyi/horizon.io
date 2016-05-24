FROM nginx

MAINTAINER Michael Glukhovsky, mike@rethinkdb.com

RUN apt-get update && \
    apt-get -y autoremove && \
    apt-get -y autoclean

# Set up nginx
COPY nginx.conf /etc/nginx/conf.d/site.conf
