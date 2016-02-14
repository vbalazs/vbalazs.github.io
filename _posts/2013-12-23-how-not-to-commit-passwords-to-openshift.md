---
title:  "How not to commit passwords to OpenShift's repository"
date:   2013-12-23 13:05:00
category: openshift
tags: [best practice, environment variables, openshift, paas, password, red hat, ruby, secret key, security, yml]
---

In the last couple of days I played with <a href="https://www.openshift.com/">OpenShift</a>, a PaaS made by RedHat. I moved one of my ruby application from VPS to there. As you may know, OpenShift is working from git repositories so a push means build and deploy.

That means (almost[^1]) everything has to be pushed to the repository. We know that to commit <a href="http://blog.shubh.am/prezi-bug-bounty/">passwords</a> and <a href="http://www.phenoelit.org/blog/archives/2012/12/21/let_me_github_that_for_you/">secret keys</a> is a bad idea. But don’t worry, use OpenShift’s <a href="https://www.openshift.com/page/openshift-environment-variables">environment variables</a>! :)</div>

The nice thing is, you can easily insert these variables into yml files, so your database config can be look like this:

```yaml
production:
  adapter: mysql2
  database: <%= ENV['OPENSHIFT_APP_NAME'] %>
  host: <%= ENV['OPENSHIFT_MYSQL_DB_HOST'] %>
  port: <%= ENV['OPENSHIFT_MYSQL_DB_PORT'] %>
  username: <%= ENV['OPENSHIFT_MYSQL_DB_USERNAME'] %>
  password: <%= ENV['OPENSHIFT_MYSQL_DB_PASSWORD'] %>
  socket: <%= ENV['OPENSHIFT_MYSQL_DB_SOCKET'] %>
  encoding: utf8
  pool: 5
```

### What about custom secrets and keys?

Well, you can set custom environment variables with rhc. I made a simple text file with my variables:

```shell
DROPBOX_APP_KEY=...
DROPBOX_APP_SECRET=...
```

Then add them with set-env command:

```shell
$ rhc set-env my/dir/openshift-env-vars -a myappname
```

Of course you shouldn’t commit this file to any repository.

You can test it with rhc:

```shell
$ rhc ssh -a myappname
$ env | grep DROPBOX
```

If you were connected to ssh while adding the variables, you should reconnect or check them from <i>irb</i>.

<div style="background-color: #f1f1f1; border: 1px solid silver; padding: 5px;">
<b>Tip</b>: now you can use <a href="https://www.openshift.com/kb/kb-e1006-sync-new-git-repo-with-your-own-existing-git-repo#comment-24175">one repository with more remote</a>.
</div>

[^1]: You have a data folder in the app-root directory, you can store some resources there.
