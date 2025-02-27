+++
date = '2010-08-23T13:06:00+02:00'
title = 'Fancy gallery script for Drupal 6'
slug = 'fancy-gallery-script-for-drupal'
tags = ['cms', 'colorbox', 'drupal', 'gallery', 'javascript', 'jquery', 'lightbox']
keywords = ['']
languages = ['en']
+++

The Drupal is one of the most popular CMSs on the Internet. We often make sites, where we have to give the opportunity to the _less advanced users to edit_ the contents of the nodes. The procedure of these modifications *should be* as simple as possible.

In most cases, our users would like to get a gallery with **nice effects** and **modest manageability**. This feature doesn’t come with Drupal 6, _it does not support_ galleries well. Sure we can do a lot of magic with modules and CCKs, but it is a nightmare and anything we get as result is complicated to manage and maintain.

I have searched way too much for the solution, so I just made a decision: I will use Google Picasa Webalbums. I found a [javascript library](http://sourceforge.net/projects/pwa/) on SourceForge, that downloads the Picasa’s rss feed and creates the list of the albums and images. The result is OK, but it gives a grim sight. We can redesign it by overwriting the js’s proper sections. I have modified the code:

* it became easily configurable (with language, and  config. constants)
* supports the [Colorbox](http://drupal.org/project/colorbox) Drupal module
* it does not interfere with jQuery anymore

Modified pwa library (right click, save as...): [download]({{< basename path=pwa-no-picasa-links.js >}})

Insert the following code into a new Drupal node:

```html
<script type="text/javascript">
  username='yourGoogleAccountName';
  photosize='800';
  columns='4';
</script>
<script src="/sites/all/themes/yourTheme/js/pwa-no-picasa-links.js" type="text/javascript">
</script>

<script type="text/javascript">
    $("a[rel='myAlbum']").colorbox();
</script>
```
