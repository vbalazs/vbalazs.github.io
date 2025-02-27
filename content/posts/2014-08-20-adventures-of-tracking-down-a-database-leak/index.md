+++
title = 'Adventures of tracking down a database pool leak'
slug = 'my-adventures-with-tracking-down-a-database-leak'
date = '2014-08-20T12:05:00+02:00'
lastmod = '2014-09-07T16:00:00+02:00'
tags = ['java', 'openam', 'jmeter', 'selenium', 'ruby']
keywords = ['']
languages = ['en']
+++

_This page was first published on August 20th 2014 and was last updated on September 7th 2014. See the update below._

Occasionally I still work on the [OpenAM][1] instance of [Kir-Dev][2] because they are transitioning to a custom OAuth2 provider solution and they need support for its plugins I wrote.

## Few words about my use-case

My latest addition was a bigger refactor and an OAuth2 AttributeMapper implementation. With this plugin, users are able to sign in on [federated][3] sites which still use OpenAM, through the new OAuth2 provider.

{{< imgproc path="images/saml2-oauth2-bridge.png" spec="q75" style="text-align: center" >}}
Sequence diagram of OpenAM as a SAML2-OAuth2 bridge
{{< /imgproc >}}

With the refactor, I introduced a bug which resulted outages caused by the exhaustion of the database connection pool on Tomcat (the container we use for OpenAM). Make things worse, it wasn't a trivial leak: it happened quite often (every couple of days) but not after some specified number of logins.

## DoS it!

Okay, not exactly. I designed an experiment to generate thousands of log in operations with the help of Selenium, PhantomJS and JMeter. I learned a lot on the way - just for a hint from where I started: control Chrome windows with Selenium from a Ruby loop. I improved my setup from 15 ops/min to 50+ ops/min. I ended up with the following:

#### Run Selenium as standalone with PhantomJS driver

```shell
$ export PATH=$(echo $PATH):/home/balo/apps/phantomjs-1.9.7-linux-x86_64/bin
$ java -jar selenium-server-standalone-2.42.2.jar
```

#### Ruby script which simulates a simple login flow

```ruby
# encoding: utf-8
require 'selenium-webdriver'

OPENAM_LOGIN_URI = "https://HOSTNAME/opensso/UI/Login?service=oauthchain"

CAPS = Selenium::WebDriver::Remote::Capabilities.phantomjs("phantomjs.cli.args" => ['--ignore-ssl-errors=true'])

def cleanup(driver)
  driver.manage.delete_all_cookies
  driver.quit
end

def login_process(driver)
  driver.get OPENAM_LOGIN_URI

  # OpenAM automatically redirects to the login form of the custom OAuth2 provider
  user_field = driver.find_element id: "LoginForm_username"
  user_field.send_keys "<<username>>"
  pass_field = driver.find_element id: "LoginForm_password"
  pass_field.send_keys "<<password>>"
  pass_field.submit

  sleep 1

  # Handle the case when we have to give permission to the application
  if driver.title.eql? "Authorize application"
    driver.find_element(name: "authorized").click
  end

  wait = Selenium::WebDriver::Wait.new(timeout: 20)
  begin
    wait.until {
      # OpenAM login url or in case of success, the protected app
      driver.current_url.start_with? OPENAM_LOGIN_URI or driver.current_url.include? "myprotectedapp.com"
    }

    # On failure it will redirect to the OpenAM login url which displays the error
    raise "gotcha: #{driver.title}" if driver.current_url.start_with? OPENAM_LOGIN_URI
  ensure
    cleanup(driver)
  end
end

driver = Selenium::WebDriver.for :remote, url: "http://127.0.0.1:4444/wd/hub", desired_capabilities: CAPS
login_process driver
```

Call the script above with JMeter OS Process Sampler a few thousand times on 4 threads and wait for failed login operations

~~~
Command: /home/balo/.rbenv/versions/2.1.2/bin/ruby
Parameter: /home/balo/code/src/github.com/vbalazs/vir-auth/do-logins.rb
~~~

{{< imgproc path="images/jmeter-auth-graph_results.png" spec="q75" style="text-align: center" >}}
jmeter graph results showing ~50 logins/minute
{{< /imgproc >}}

## About the bug

I implemented my database connection class as an [AutoCloseable][4]. My mistake was that I wanted to be smart. I made lazy connection initialization (why?!) and connection validation to make sure I handle every possible corner case in the universe. A friendly suggestion: don't do it.

{{< imgproc path="images/twitter_nvining_status_500094840865304577.png" spec="webp" style="text-align: center" >}}
<a href="https://twitter.com/nvining/status/500094840865304577">Tweet</a> by @nvining: A Reminder: Kreimeier's Law of Programming states "If you think you are doing something smart, you are probably doing something stupid."
{{< /imgproc >}}

I [simplified][5] the code, from now on, it initialises the connection in the constructor and fail early if something went wrong.

**Update (07 Sept 2014)**: [@aldaris][6] pointed out that my fix didn't completely solve the issue. You can see his PR [here][7]. Thanks!

[1]: http://openam.forgerock.org
[2]: http://kir-dev.sch.bme.hu/about/
[3]: http://openam.forgerock.org/openam-documentation/openam-doc-source/doc/admin-guide/index/chap-federation.html#about-federation
[4]: http://docs.oracle.com/javase/7/docs/api/java/lang/AutoCloseable.html
[5]: https://github.com/kir-dev/vir-auth/pull/6
[6]: https://github.com/aldaris
[7]: https://github.com/kir-dev/vir-auth/pull/7
