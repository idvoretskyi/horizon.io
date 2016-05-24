FROM ubuntu:16.04

MAINTAINER Michael Glukhovsky, mike@rethinkdb.com

RUN apt-get update && \
    apt-get -y install build-essential ruby ruby-dev && \
    apt-get -y autoremove && \
    apt-get -y autoclean && \
    gem install bundler

# Set up Bundler assets
WORKDIR /tmp
COPY Gemfile* ./
RUN bundle install

# Copy assets
COPY ./ ./

# Build the output
CMD ["bundle","exec","jekyll", "build", "-d", "/usr/share/nginx/html"]
