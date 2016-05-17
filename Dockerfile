FROM nginx

MAINTAINER Michael Glukhovsky, mike@rethinkdb.com

RUN apt-get update && \
    apt-get -y install supervisor && \
    apt-get -y install build-essential ruby ruby-dev && \
    apt-get -y autoremove && \
    apt-get -y autoclean && \
    gem install bundler

COPY Gemfile Gemfile.lock /tmp/
RUN bundle install --gemfile /tmp/Gemfile

# Set up nginx
COPY _docker/nginx.conf /etc/nginx/nginx.conf
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Supervisor manages running services
RUN mkdir -p /var/log/supervisor
COPY _docker/supervisor.conf /etc/supervisor/conf.d/

# Copy assets
COPY . /tmp/horizon.io/
RUN bundle exec jekyll build -s /tmp/horizon.io/ -d /usr/share/nginx/html

# Start services
CMD ["supervisord", "-n"]
