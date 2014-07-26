---
layout: post
title:  "Create application from a specified git SHA on Openshift"
date:   2014-04-26 15:05:00 CEST
category: openshift
tags: [openshift, paas, red hat, rhc, command line, git]
---

Currently there are two options to do this on Openshift. Probably everyone will
meet the web console interface first, where one can specify the location of
an existing source code repository which will be copied and used for the
application. There is also an input for the branch or tag (or SHA) if the
head of master is not adequate.

The second, less known solution is to use the `rhc` (**R**ed **H**at **C**loud)
command line tool.

It has a `--from-code` option and you can also specify git ref however I didn't
find this in the documentation. Simply append your branch, tag or SHA after the
git repository, followed by `#` character.

```
rhc create-app myapp php-5.4 --from-code https://github.com/nick/myapp.git#9fbfc057
```

Be aware that there is a [bug](https://bugzilla.redhat.com/show_bug.cgi?id=1122515)
which makes this parameter ignored if the name of branch contains `/` character.

Both methods send requests to the Broker via REST API. You can read about what
happens when you create an application
[here](https://gist.github.com/Filirom1/6b6aa05a24bf2fcd4a7c), thanks to
[Filirom1](https://github.com/Filirom1).
