# horizon.io
The Horizon website.

### Set up your environment

To install the required packages:

```
rake init
```

To preview the site:

```
rake
```

To build the site:

```
rake build
```

The output will be in `_site`.


# WARNING

Do not edit any documentation in the `docs` folder. It will get periodically
overwritten and resynced from the rethinkdb/horizon-docs repo, which is where
all documentation edits should go.
