---
layout: post
title: "TLS-enable your Horizon application with Let's Encrypt"
author: Ryan Paul
author_twitter: segphault
permalink: blog/letsencrypt-tutorial/
---

<img src="/images/posts/2016-08-01/chest.png" style="width: 350px; float: right; display: inline-block">

Transport Layer Security (TLS) helps protect network communication from 
eavesdropping and man-in-the-middle attacks. Enabling TLS everywhere is 
increasingly regarded as a best practice, but it's especially important in 
applications that accept sensitive information or perform user authentication.

In the past, the cost and difficulty of obtaining certificates created barriers 
to ubiquitous TLS adoption. That changed when a group of companies and 
non-profit organizations launched [Let's Encrypt][], a largely automated system 
that dispenses certificates at no cost. In this tutorial, I'll describe how you 
can TLS-enable your Horizon application in a matter of minutes using a free 
certificate from Let's Encrypt.

<!--more-->

# Deploy a Horizon application on your server

To deploy my Horizon application, I set up a [Digital Ocean][] droplet that runs
 Ubuntu 16.04. I performed the following steps to obtain all of the necessary 
dependencies:

* [Installed RethinkDB][] from our APT repository
* Installed Node.js and npm from Ubuntu's Universe repository
* Created a symbolic link at `/usr/bin/node` and pointed it to `/usr/bin/nodejs`
* Globally installed Horizon from npm
* Used `hz init` to create a new Horizon project
* Set up a DNS record for my domain to point it to the server's public IP address

If you need more help figuring out how to install the dependencies and create a 
Horizon project, you can refer to our [installation docs][]. After I installed 
the dependencies and created the project, I ran the application without TLS to 
ensure that everything worked properly:

> hz serve --dev --bind 0.0.0.0 --port 80

The standard Horizon application template includes an `index.html` file that 
displays a little message when it successfully establishes a WebSocket 
connection to the backend. When I visited my new application in the browser, the
 message displayed correctly. If you don't see it, you might be able to find out
 what went wrong by adding the `--debug` flag to `hz serve` or looking at any 
error messages that appear in the browser's JavaScript console.

# Use certbot to get a certificate

Under the hood, Let's Encrypt is powered by the Automatic Certificate Management
 Environment (ACME), which provides a standardized protocol that clients can use
 to request certificates. The EFF maintains a high-quality ACME client called 
[certbot][] that users can run at the command line. The certbot client is highly
 portable because it's written in Python. On an Ubuntu server, you can install 
it from the distro package repository where it's called `letsencrypt`.

Certbot has several built-in mechanisms that it can use to verify your ownership
 of a given domain, but the *webroot* method is best-suited for bare Horizon 
applications. When you tell certbot to use the *webroot* method, it plants a 
file in the directory served by your Horizon application so that the ACME 
backend can see it when it hits the corresponding URL on your domain. To get 
your certificate, execute the following command while your Horizon application 
is running in the background on port 80:

> letsencrypt certonly --webroot -w dist -d mydomain.com

The `-w` parameter tells certbot to plant its file in the `dist` folder. The 
`-d` parameter specifies the domain name for your application. When you run the 
command, certbot will prompt you to provide your e-mail address and agree to the
 Let's Encrypt terms of service. After you enter that information, certbot will 
download your certificates and display a message that tells you where they are 
stored on the filesystem.

The Let's Encrypt certificates are valid for 90 days. You can use certbot to 
renew them from the command line by periodically running `letsencrypt renew`. 
The command checks to see if your certificates are expiring and performs the 
renewal process as needed. Let's Encrypt recommends setting up a cron job that 
runs the command twice a day.

# Configure Horizon to use the certificate

Now that you have a certificate, you have to configure Horizon so that it knows 
where to find the key and certificate on the filesystem. Certbot stores 
everything in `/etc/letsencrypt`, creating a special subdirectory for each 
domain. If your domain is `mydomain.com`, the files are located in 
`/etc/letsencrypt/live/mydomain.com/`.

In the directory for your domain, you will find `privkey.pem` and `cert.pem`. 
Edit your `.hz/config.toml` and set the `key_file` and `cert_file` options so 
that they point to those files accordingly:

```toml
secure = true
key_file = "/etc/letsencrypt/live/mydomain.com/privkey.pem"
cert_file = "/etc/letsencrypt/live/mydomain.com/cert.pem"
```

You can also take the opportunity to set the `bind` and `port` values in the 
config file so that you don't have to specify them manually at the command line 
when you run `hz serve`. To make sure your application is accessible at an 
`HTTPS` address, use port 443 instead of 80:

```toml
bind = ["0.0.0.0"]
port = 443
```

When you finish editing your `.hz/config.toml`, run your Horizon application 
with `hz serve`. You should be able to access it by visiting your domain with 
the `HTTPS` protocol. If everything worked as expected, your browser will 
display the lock sigil typically associated with a TLS-enabled website. When TLS
 is enabled, Horizon uses it for WebSocket connections in addition to HTTP 
requests. If you look in the `Network` panel in Chrome's developer tools, you 
will see that Horizon's WebSocket connection uses the `WSS` protocol, the 
WebSocket equivalent of `HTTPS`.

# Alternative approaches

This tutorial focuses on how to use certbot to enable TLS for a bare Horizon 
application running directly on port 443. There are a number of other deployment
 scenarios that you might want to consider. If you use NGINX as a reverse proxy 
in front of your Horizon application, for example, you could configure TLS in 
your NGINX vhost instead of your `.hz/config.toml`. You could also use a reverse
 proxy that has a built-in ACME client so that you don't need to run certbot to 
get your certificates. [Caddy][] is a good piece of software for users who want 
that kind of setup.

Ready to start building your application with Horizon? Check out our 
[getting started][] guide to learn more.

**Resources**:

* The official [Let's Encrypt][] website
* The [ACME][] specification
* EFF's [Certbot][] website

[Let's Encrypt]: https://letsencrypt.org/
[ACME]: https://letsencrypt.github.io/acme-spec/
[Certbot]: https://certbot.eff.org/
[Digital Ocean]: https://www.digitalocean.com/
[installed RethinkDB]: https://www.rethinkdb.com/docs/install/ubuntu/
[installation docs]: /install/
[Caddy]: https://caddyserver.com/
[getting started]: /docs/getting-started/

