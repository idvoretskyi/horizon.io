---
layout: documentation
title: Integrating with web frameworks
id: integration
permalink: /docs/integration/
---

While you can start the Horizon server from the `hz` [command line tool][cli], it's also possible to start it from within Node-based web frameworks by importing `@horizon/server` and passing a server connection to the Horizon constructor.

[cli]: /docs/cli

For instance, using the [Express][] framework, the steps are:

[express]: http://expressjs.com

```js
#!/usr/bin/env node
'use strict'

const express = require('express');
const horizon = require('@horizon/server');

const app = express();
const http_server = app.listen(8181);
const options = { auth: { token_secret: 'my_super_secret_secret' } };
const horizon_server = horizon(http_server, options);

console.log('Listening on port 8181.');
```

Express and Horizon are required, and Express is instantiated with `app.listen()`. Then the resulting `http_server` object is passed to `horizon` along with an option object. Options that can be passed to the Horizon server constructor are largely identical to the options that can be defined in the [configuration file][cf].

**Note:** Passing options to the constructor is the only way to configure the Horizon server when it's started in this fashion.

[cf]: /docs/configuration

For some examples with other frameworks, including Koa and Hapi, consult the Horizon [examples page][ex].

[ex]: /docs/examples

## Configuring OAuth providers

OAuth endpoints cannot be set up through the options object passed to the Horizon server constructor. Instead, you'll need to use the `add_auth_provider` method on the instantiated Horizon server object.

```js
// ... initialization code as above for Express
const horizon_server = horizon(http_server, options);

horizon_server.add_auth_provider(
    horizon_instance.auth['github'],
    { id: 'id', secret: 'secre', path: 'github' }
);
```

For more details on setting up Oauth, read the section in [Authentication][a].

[a]: /docs/authentication/#oauth
