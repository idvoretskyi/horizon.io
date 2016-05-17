FROM nginx

MAINTAINER Michael Glukhovsky, mike@rethinkdb.com

RUN apt-get update && \
    apt-get -y install supervisor && \
    apt-get -y install build-essential ruby ruby-dev && \
    apt-get -y autoremove && \
    apt-get -y autoclean && \
    gem install jekyll

# Set up nginx
COPY _docker/nginx.conf /etc/nginx/sites-available/horizon.io
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
RUN ln -s /etc/nginx/sites-available/horizon.io /etc/nginx/sites-enabled/horizon.io && \
    rm /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# Supervisor manages running services
RUN mkdir -p /var/log/supervisor
COPY supervisor.conf /etc/supervisor/conf.d/

# Set up bundle for ruby
COPY . /tmp/horizon.io/

WORKDIR /tmp/horizon.io
RUN bundle install
RUN bundle exec jekyll build -s /tmp/horizon.io/ -d /var/www/horizon.io

# Start services
CMD ["supervisord", "-n"]
