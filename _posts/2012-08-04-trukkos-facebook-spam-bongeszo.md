---
title:  "Trükkös facebook spam - böngésző kiterjesztéssel"
date:   2012-08-04 13:32:00
category: web
tags: [biztonság, böngészők, chrome, facebook, firefox, kiegészítő, plugin, spam]
---

Általában nem írnék meg egy erről szóló bejegyzést, mert minden bokorban terem már egy valamilyen módon spamelő vagy kémkedő alkalmazás. Egy ismerősöm azzal keresett meg, hogy spam üzenetek jelennek meg a falán, amikben random ismerősök vannak betagelve. Gondoltam megint egy spammer facebook alkalmazás, de állította, hogy már minden alkalmazást kitörölt. Nekem is gyanús volt, hogy a feltöltött képek és bejegyzések a saját nevével érkeznek.<br />
Itt még mindig egy primitív dologra gyanakodtam, de amikor jelszóváltoztatás után is érkeztek a bejegyzések már éreztem, hogy itt valami disznóság van, ezért elkezdtem nyomozni :)<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-Ezv64iwj32E/UB0DnUmiF5I/AAAAAAAADv4/mc67Max44yM/s1600/fb-post.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="226" src="http://2.bp.blogspot.com/-Ezv64iwj32E/UB0DnUmiF5I/AAAAAAAADv4/mc67Max44yM/s400/fb-post.png" width="400" /></a></div>
<br />
<br />
A posztban lévő link egy <a href="http://dl.dropbox.com/u/95861912/help.html">dropbox linkre</a> mutat, ami teljesen leutánozza a youtube kinézetét, azzal a kivétellel, hogy egy plugin telepítését kéri a felhasználótól! Itt már megszólal a vészcsengő egy tapasztaltabb felhasználónál, de a gyanútlan áldozatok rákattintanak. Gondolhatjuk, hogy megint csak egy oldal lájkoló láthatatlan &lt;div&gt;... De nézzük csak meg, hogy mit is csinál ez a link!<br />
<br />
<i>(Sajnos erről képernyőképet nem készítettem először, azóta pedig a dropbox letiltotta, mert elérte a forgalmi korlátot. Ha holnap működik még az oldal, akkor frissítem a bejegyzést, addig higgyétek el nekem :-)</i><br />
<br />
Többek között megvizsgálja a böngészőt és letölt egy ennek megfelelő bővítményt (Chrome és Firefox érintett, a többit átirányítja egy másik oldalra).<br />
Kicsit utánajártam a Crome bővítménynek (<a href="http://dl.dropbox.com/u/3092188/blog/2012.08/youtube.crx.deleteThis">letölthető itt</a>, <a href="http://dl.dropbox.com/u/3092188/blog/2012.08/plugin.xpi.deleteThis">Firefox bővítmény itt</a>), egy "<i>YouTube Premium Video</i>" kiterjesztésnek álcázza magát, valód Youtube ikonokkal.<br />
Az analytics (<i>UA-31861921-1</i>) és whois.among.us (<i>3bcmg6ofjwms</i>) statisztikákon kívül még behivatkozik egy, a konkrét spamelést és terjesztést végző javascriptet:&nbsp;<a href="http://feedbuzz.info/js.php">http://feedbuzz.info/js.php</a> (ha időközben elérhetetlenné válna, a kimenet <a href="http://dl.dropbox.com/u/3092188/blog/2012.08/js.php.html">letölthető itt</a>)<br />
<br />
<b><span style="font-size: large;">Hogyan kerüljük el?</span></b><br />
<br />
<ol>
<li><b>Mindig ellenőrizzük a meglátogatott oldalak URL-jét</b>. Itt is feltűnhetett volna, hogy a szokásos youtube.com helyett dl.dropbox.com van.</li>
<li><b>Gyanakodjunk</b>, ha egy gyakran látogatott, ismert működésű oldal hirtelen valaminek a letöltésére, elvégzésére kér fel.</li>
<li><b>Csak megbízható forrásból telepítsünk bővítményeket</b> és időnként nézzük őket végig, a már nem használtakat töröljük, tiltsuk le!</li>
<li>Ne higgyünk a <i>kihagyhatatlan, úgy sem tudjuk x másodpercnél tovább nézni, Justin Bieber akasztása (!!!), kígyó megeszik egy embert</i>, egyéb badarságokat kínáló bejegyzéseknek. Ha mégis nagyon érdekel, akkor legyünk gyanakvóak és használjuk a <i>Chrome jobb gomb a linkre -&gt; Megnyitás inkognitó ablakban </i>funkcióját, így legalább a bejelentkezett munkamenetünkhöz nem férnek hozzá.</li>
</ol>
<br />
<div style="background-color: #f1f1f1; border: 1px solid silver; padding: 5px;">
<b>Tipp</b>: ne csak a kiegészítőket, hanem a beépülőket is ellenőrizzük (Chrome esetében <i>chrome://plugins</i>)! A <b>nem használtakat pedig tiltsuk le</b> (pl. Remoting viewer, Microsoft Office, VLC, Silverlight, Java (!!!))</div>
<br />
<b>Megjegyzés1</b>: nem tisztázott, hogy Chrome 21-re hogyan került fel a bővítmény egy idegen oldalról. Chrome 20-ban még felajánlotta, hogy telepítésre kerüljön-e, de a 21-es verzióban figyelmeztet, hogy csak az áruházból telepíthető bővítmény és emiatt elutasításra kerül. Linux alatti Chrome-ra pedig fel sem sikerült telepítenem, mert hibás bővítményt írt. Valaki utánanézhetne pontosan :)<br />
<br />
<b>Megjegyzés2</b>: már több helyen is jelentettem a Google felé a támadást, még nem érkezett visszajelzés<br />
<br />
<b>Megjegyzés3</b>: nem vagyok elvakult Chrome felhasználó, de mivel ezt a böngészőt ismerem a legjobban, ezért ebből hoztam a példákat. Elképzelhető, hogy a fent említett funkciók a többi böngészőben is elérhetőek.<br />
<br />
<b>Frissítés(08.05):</b>&nbsp;a stuff másnak is feltűnt, az érdeklődők az <a href="http://www.exposedbotnets.com/2012/08/feedbuzzinfo-malicious-browser.html">exposedbotnets</a>&nbsp;oldalán további információkat és kódrészleteket találhatnak a kiterjesztéssel kapcsolatban.
