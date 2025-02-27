+++
date = 2025-02-27T22:48:38+01:00
draft = true
title = 'From Jekyll to Hugo'
tags = ['no-nonsense', 'hugo', 'blogging']
keywords = ['']
languages = ['en']
+++

## Motivation

After seven years, I decided to write a blog post again, only to find that my old 
toolchain hadn’t aged well. My blog was built on Jekyll, specifically the 
[GitHub Pages gem](https://github.com/github/pages-gem). Over time, as I continually updated my local Ruby 
installation, I had to update the blog's gems as well. 
After falling down a rabbit hole of troubleshooting gem and theme updates, I 
realized that GitHub Pages [doesn’t keep up with Jekyll](https://github.com/github/pages-gem/issues/651) either. I could have 
made it work with Jekyll alone, but it felt like the right time to switch to 
something leaner and _less likely_ to break over time.

I ultimately chose [Hugo](https://gohugo.io). It’s fast, feature-rich, and doesn’t require Ruby, 
a JavaScript runtime, or any extra dependencies.

## Theme

My [previous theme](https://github.com/poole/hyde) was still functional, but over the years, I became 
increasingly frustrated with the modern web. Inspired by the 
[Bear blogging platform](https://bearblog.dev/) and its no-nonsense philosophy, I decided to strip 
away external fonts, analytics, and the unnecessary fixed sidebar.

I also wanted a theme that respects the system’s light/dark mode settings for 
better readability. I settled on [hugo-bearcub](https://github.com/clente/hugo-bearcub). It offers more than I need, 
but I had some issues with the more minimal [hugo-bearblog](https://github.com/janraasch/hugo-bearblog). 
I might revisit it later to simplify things further.

## Posts

In Jekyll, I [had a custom permalink configuration](https://github.com/vbalazs/vbalazs.github.io/blob/22ca8d653f61a971c991fecdd7e5e6d155d311a6/_config.yml#L10):

```yaml
permalink: /:year/:month/:title.html
```

Hugo uses a different default permalink structure, but I wanted to maintain my 
old links. While I could have used an alias (redirect) in the front matter, I 
decided against it—switching tools shouldn’t force me to change permalinks. 
If I migrate to another static site generator in the future, I’d have to juggle 
multiple URL schemes, creating a convoluted mess of redirects.

Instead, I configured Hugo like this:

```toml
# [...]
# Displaying the .html extension is considered "ugly" by some
# Note: Order matters! This should be defined at the top, above `menus` and `permalinks`
uglyURLs = true

[permalinks]
  posts = '/:year/:month/:slug'

[outputFormats]
  [outputFormats.RSS]
    mediatype = "application/rss"
    baseName = "atom" # Preserves the `atom.xml` name from Jekyll for the RSS feed
```

In Hugo, embedding raw HTML in Markdown isn’t allowed (or recommended), so for 
some posts, I renamed file extensions to `.html` to render them as-is. For others, 
I rewrote snippets in Markdown or used [shortcodes](https://gohugo.io/content-management/shortcodes/).

Speaking of shortcodes, Hugo only interprets variables and functions in templates, 
so I had to use them for handling assets in [page bundles](https://gohugo.io/content-management/page-bundles/):
- Displaying images using the [imgproc shortcode](https://github.com/gohugoio/hugoDocs/blob/59e057bb43907b3c5675d0d8645d02327f12bef1/layouts/shortcodes/imgproc.html)
- Linking to a resource within a post, such as a full-size image or a downloadable 
file
  {{< details summary="See code" >}}
  ```go-html-template
  {{- /*
    Renders an absolute path to a page bundle or global resource for use in an <a href> attribute.
  
    @returns template.HTML
  
    @example {{< basename path=photos/photo1.jpg >}}
  */}}
  {{- with $.Get "path" }}
    {{- with $i := or ($.Page.Resources.Get .) (resources.Get .) }}
      {{ .RelPermalink }}
    {{- end }}
  {{- end }}
  ```
  This workaround seems necessary because of my custom permalink structure.
  {{< /details >}}

While a bit more complex than I’d like, this approach keeps post assets 
self-contained, avoiding reliance on external storage or a CDN.

## Hosting

I’m grateful for the work GitHub has put into GitHub Pages—it served me well for 
many years. For now, I’ll continue using it for building and hosting this site.

