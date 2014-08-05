---
title:  "Custom ‘Follow’ button on Blogger"
date:   2010-11-10 22:09:00
category: web
tags: [blogger, custom follow button, english, fancy, google]
---

Lot of Blogger member use the “_Followers_” gadget to display readers who follow his/her blog in the Blogger’s system.
Google doesn’t provide any way  to display “_Follow_” button only, without the readers (except from the *ugly* navbar). It’s an understandable decision, that you don’t want to slow your page loading with laggy iframe, but you’d like to apply a fancy icon to follow. We can find the solution right in the Navbar source.

**We need your blog ID**

After login, go to your Blogger Designer and you can copy the ID from your browser’s address bar.

<img border="0" src="http://dl.dropbox.com/u/3092188/blog/2010.11/browser-bar.png" width="500" />

**Paste button to your blog**

Add or edit a gadget in HTML mode and paste the following code:

~~~html
<img alt="Follow me on Blogger!"
  onclick="window.open('http://www.blogger.com/follow-blog.g?blogID={BLOG_ID}',
     'followblog',
     'height=600, width=600, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');"
  src="http://dl.dropbox.com/u/3092188/blog/icons/blogger-icon.png"
  style="border: 0px; cursor: pointer; width: 32px;" />
~~~

Replace the **{BLOG_ID}** with your ID.
Of course you can use this JS snippet for almost every HTML element.  You can observe the outcome as at my first gadget of the panel on the right.
