---
layout: post
title:  "Fancy gallery script for Drupal"
date:   2010-08-23 13:06:00
category: drupal
tags: [cms, colorbox, drupal, english, gallery, javascript, jquery, lightbox, php, pwa]
---

<div style="text-align: justify;">The Drupal is one of the most popular CMSs on the Internet. We often make sites, where we have to give the opportunity to the <i>less advanced users to edit</i> the contents of the nodes. The procedure of these modifications <i>should be</i> as simple as possible.</div><div style="text-align: justify;">In most cases, our users would like to get a gallery with <b>nice effects</b> and <b>modest manageability</b>. This feature doesn’t come with Drupal 6, <i>it does not support</i> galleries well. Sure we can do a lot of magic with modules and CCKs, but it is a nightmare and anything we get as result is complicated to manage and maintain.</div><div style="text-align: justify;"><br />
</div><div style="text-align: justify;">I have searched way too much for the solution, so I just made a decision: I will use Google Picasa Webalbums. I found a <a href="http://sourceforge.net/projects/pwa/">javascript library</a> on SourceForge, that downloads the Picasa’s rss feed and creates the list of the albums and images. The result is OK, but it gives a grim sight. We can redesign it by overwriting the js’s proper sections. I have modified the code:</div><ul><li style="text-align: justify;">it became easily configurable (with language, and config. constants)</li>
<li style="text-align: justify;">supports the <a href="http://drupal.org/project/colorbox">Colorbox</a> Drupal module</li>
<li style="text-align: justify;">it does not interfere with jQuery anymore</li>
</ul><br />
<div style="text-align: justify;">Modified pwa library (right click, save as...): <a href="http://dl.dropbox.com/u/3092188/blog/pwa-no-picasa-links.js">download</a></div><div style="text-align: justify;"><br />
</div><div style="text-align: justify;">Insert the following code into a new Drupal node:</div>

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
<div style="text-align: justify;">You should see the result: <a href="http://ezk.bme.hu/ezk/galeria">PWA Gallery in Drupal</a><br />
Your questions and comments are welcome! :)</div>
