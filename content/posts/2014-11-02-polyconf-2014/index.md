+++
title = 'Polyconf 2014'
slug = 'polyconf-2014'
date =   '2014-11-02T18:00:00+01:00'
tags = ['conference', 'ruby', 'poland']
keywords = ['']
languages = ['en']
+++

Last week, with the [company][dina]'s support, we had the chance to visit PolyConf.

> PolyConf is a two-day, single track, multi-disciplinary conference on advanced
technologies for programmers interested in polyglot approach to software development.
Our goal is to foster exchange between programming languages.

{{< imgproc path="images/polyconf.png" spec="webp" style="text-align: center" >}}
PolyConf logo
{{< /imgproc >}}

The conference was great, I will highlight some of my favourite talks.

### [Garret Smith][gsmith] - The Value Of Diversity And Other Lessons From Biology

We usually look to software as an engineered bridge or building (structure) but
maybe we oversimplify it. Garret took a different approach and look to software
as a biological organization. He pointed out that in biology, diversity is driving
adoption which is the driving force of innovation. Could we change our view about
software development process? Could we apply evolutionary models to our job?
I highly recommend this talk, we should talk about it more.

### [Justyna Walkowska][jwalkowska] - Should Everybody Learn to Code?

It's a hot topic in every community and also in [education politics][comprev].
Justyna is a teacher herself who taught computer science to different ages
(from children to elderly). She shared her experiences and stated that teaching
programming to children can be useful to strengthen their basic logical thinking.

### [David Nolen][dnolen] - Immutability: Putting The Dream Machine to Work

It was a great presentation about old and often forgotten concepts, such as
[persistent data structure][pdstr] and immutable bitmapped vector trie. He also
presented some real-life examples on how we could apply these techniques to be
more memory and CPU efficient. He mentioned a 50 years old paper I'll definitely
read: Man-Computer Symbiosis by J. C. R. Licklider [link][mancompsymb].

### [Jack Franklin][jfranklin] - Dependency And Module Management With JavaScript

I don't consider myself a javascript developer so I can't really evaluate this
talk but for me it was a good summary of the current situtation and the possible
future. Spoiler alert: [jspm.io](http://jspm.io) ftw!

https://speakerdeck.com/jackfranklin/polyconf-js-modules

### [Alexander Solovyov][asolovyov] - Writing Snake game in ClojureScript with React

Alexander was a genius on stage, he was live coding in ClojureScript and presented
its capabilities to the audience. I liked his style a lot and he showed that how
to do an entertaining and useful live coding session on a conference.

### [John Hughes][jhughes] - Testing the Hard Stuff and Staying Sane

I have already seen this presentation from John on [Craft conference][craftqc]
([recording][quickchecktalk]), the concept is promising, I'm planning to give
[rubycheck][rbcheck] a shot.

### [Irina Bednova][ibednova] - Using boolean logic to deal with dates

It was a short quicktalk, I liked it because she reduced a complex boolean expression
with [Karnaugh map][karnaugh]. I learnt about it in high school, we used it for
solving logic circuits but I've never thought about applying it in my everyday job :)

https://speakerdeck.com/jafrog/using-boolean-logic-to-deal-with-dates

### [Michał Taszycki][mtaszycki] - Commodore 64 could do that?

This was a funny talk about how we can do asynchronous programming on our beloved
C64 with a neat trick. Subscribe to [64bites screencasts][64bites] to learn how.
Long live C64!

https://speakerdeck.com/mehowte/commodore-64-could-do-that

I don't know if you are interested in the food on conferences but beat this:

{{< imgproc path="images/528136828742676480.png" spec="webp" style="text-align: center" >}}
<a href="https://twitter.com/Jack_Franklin/status/528136828742676480">Tweet</a> by @Jack_Franklin: So #polyconf has croissants filled with nutella. Easily the best food at a conference ever! :D
{{< /imgproc >}}

**Thanks for the organizers, everybody who came and I hope we will meet next year :)**

[dina]: http://www.digitalnatives.hu
[gsmith]: http://twitter.com/gar1t
[jwalkowska]: http://girllostinit.com
[dnolen]: http://twitter.com/swannodette
[ztellman]: http://twitter.com/ztellman
[jfranklin]: http://twitter.com/Jack_Franklin
[asolovyov]: http://twitter.com/asolovyov
[jhughes]: http://twitter.com/rjmh
[ibednova]: https://twitter.com/jafrog
[mtaszycki]: https://twitter.com/mehowte
[comprev]: http://www.bbc.com/news/technology-29010511
[pdstr]: http://en.wikipedia.org/wiki/Persistent_data_structure
[mancompsymb]: http://groups.csail.mit.edu/medg/people/psz/Licklider.html
[craftqc]: http://craft-conf.com/2014/#speakers/JohnHughes
[quickchecktalk]: http://www.ustream.tv/recorded/46638775
[rbcheck]: https://github.com/mcandre/rubycheck
[karnaugh]: http://en.wikipedia.org/wiki/Karnaugh_map
[64bites]: http://signup.64bites.com
