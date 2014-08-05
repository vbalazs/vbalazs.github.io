---
title:  "My Simonyi Conference talk"
date:   2014-04-23 19:15:00 CEST
category: university
tags: [openjdk, graal, truffle, jruby, interpreters, talks]
---

While I was at MLOC.JS I spoke with [Tamas](https://twitter.com/tmichelberger) and [Szabolcs](https://twitter.com/SzabolcsVaradi) about the opportunity to talk at the [Simonyi Conference](http://konferencia.simonyi.bme.hu/) in April.
This post is about my experiences, research and learning processes I went through while I prepared for my presentation.

TL;DR: you can find my slides here:

<p align="center">
  <iframe src="http://www.slideshare.net/slideshow/embed_code/33564871?rel=0" width="427" height="356" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px 1px 0; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>
</p>

I was a bit nervous because I have never presented at a conference before (neither at a meetup at that time) but I thought, here is my chance to take a big step forward. I kind of knew what I'd like to talk about. I got excited when I read about OpenJDK Graal and Truffle on the [JRuby blog](http://blog.jruby.org/2014/01/truffle_graal_high_performance_backend/) in January, I wanted to dig deeper into the topic. I sent my abstract and I began to work.

I researched two topics in parallel. On one hand, how to give a good talk and on the other hand, the main subject of my presentation itself.

## How to give a good talk

I read a ton of article about this and I'm still not sure how to be a great performer. There are too much information out there, I can't keep all the rules and "advices". I felt I will be the worst on the whole conference... And not just on this event but every conference ever :D
Then I read Avdi Grimm's post about ["How to suck at Conference talks"](http://devblog.avdi.org/2014/04/08/how-to-suck-at-conference-talks/) and finally, I was able to relax. I couldn't thank him enough for his article.
I also highly recommend [speaking.io](http://speaking.io/) as an excellent "cut the BS" source.

## On the professional side

I knew how JRuby works but this was a new topic so I started with the basics. Fortunately, I found great resources, including some good papers:

- Christian Wimmer and Chris Seaton speak at the JVM Language Summit, July 31, 2013. [(link)](http://medianetwork.oracle.com/video/player/2623645003001)
- Thomas Würthinger, Christian Wimmer, Andreas Wöß, Lukas Stadler, Gilles Duboscq, Christian Humer, Gregor Richards, Doug Simon, Mario Wolczko: One VM to Rule Them All. In Proceedings of Onward!, ACM Press, 2013. [(link)](http://lafo.ssw.uni-linz.ac.at/papers/2013_Onward_OneVMToRuleThemAll.pdf)
- Thomas Würthinger, Andreas Wöß, Lukas Stadler, Gilles Duboscq, Doug Simon, Christian Wimmer: Self-Optimizing AST Interpreters. In Proceedings of the Dynamic Languages Symposium, pages 73–82. ACM Press, 2012. [(link)](http://lafo.ssw.uni-linz.ac.at/papers/2012_DLS_SelfOptimizingASTInterpreters.pdf)
- Pat Shaughnessy: Ruby Under a Microscope, ISBN-13: 978-1-59327-527-3 [(link)](http://patshaughnessy.net/ruby-under-a-microscope)

I had the oppurtinity to chat with [Chris Seaton](http://www.chrisseaton.com) on IRC and on Skype. He helped me to set up a quick development environment and provided good pointers where could I research further. (Thanks!)

After that, the main problem was to how should I structure my talk. The Simonyi conference is an open and free event for everyone, organized by university students every year. I couldn't rely on the programming knowledge of the audience, it wasn't an exclusive event only for coders and engineers. Because the nature of the topic, I had to balance between the fans of dynamic languages and Java too. I wanted my topic to be interesting for everyone so I rewrote my whole talk like 3 times. Finally I found an approach which I could live with.

Then I faced the next problem: my 25 minutes barrier. I needed to be careful about what I will tell to the audience and what I won't, and to stay entertaining and comprehensible at the same time. I finished my talk in 28 minutes so I definitely have room for improvement.

I feel the presentation could be better but I got some promising feedback. Hopefully I shed light on the bright future of JVM and more people will contribute to these projects.

I'd like to thank the reviews and support to Szabolcs and Tamas as well as the conference technical help to [Gabor](https://twitter.com/ghaabor).
