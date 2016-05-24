---
layout: post
title: "DigitalOcean adds one-click install for Horizon apps"
author: Ryan Paul
author_github: segphault
published: false
---

Yesterday we [announced][] the first release of Horizon, an open-source backend for
realtime web applications. Developers can use the Horizon server and its
frontend client library to build and scale realtime web applications without
writing any backend code. Built on top of RethinkDB, Horizon extends the
database's built-in support for live updates all the way to the frontend.

To help you get started with Horizon right away, we worked with our friends at
[Digital Ocean][] to put together a [One-Click Application][one-click].
You can use it to setup Horizon on Digital Ocean, with all of the dependencies
that you will need to get your application up and running. It includes
RethinkDB, Node.js, the Horizon server, and Nginx. You can
[follow their tutorial][tutorial] to deploy your first Horizon application.

<!--more-->

We're big fans of Digital Ocean's affordable Linux VPS hosting. The One-Click
Horizon droplet provides a great environment for rapid protyping. You can also
[deploy a full RethinkDB cluster][cluster] on Digital Ocean when you are ready
to put your application into production.

If you're using Digital Ocean for the firs time, you can use the promo code
`HORIZON10` to get $10 in server credit&mdash;enough to run a 1GB droplet for a month.
We hope that you have an exciting voyage as you set sail toward the Horizon on
Digital Ocean.

[announced]: http://rethinkdb.com/blog/horizon-release/
[Digital Ocean]: http://digitalocean.com/
[one-click]: https://www.digitalocean.com/features/one-click-apps/
[tutorial]: https://www.digitalocean.com/community/tutorials/how-to-use-the-horizon-one-click-install-image
[cluster]: https://www.digitalocean.com/community/tutorials/how-to-create-a-sharded-rethinkdb-cluster-on-ubuntu-14-04
