---
layout: post
title:  "Proper JSON output with JAX-RS"
date:   2013-03-10 12:51:00
category: java
tags: coding, english, java, jax-rs, json, rest, webservice
---

<div>
I had to develop a <a href="http://en.wikipedia.org/wiki/Representational_state_transfer#RESTful_web_services">REST webservice</a> endpoint recently in our JavaEE application. After we figured out what data the client needs we came to an agreement that we will produce <a href="http://www.json.org/">JSON</a> output. I knew <a href="http://jax-rs-spec.java.net/">JAX-RS</a> can do that, so I simply wrote a method like this:
</div>

```java
@GET
@Produces(MediaType.APPLICATION_JSON)
@Path("/get/{param1}/{param2}")
public List<ApprovedEntrant> getEntrants(
            @PathParam("param1") final String param1,
            @PathParam("param2") final String param2) {

     final List<ApprovedEntrant> entrants = new LinkedList<ApprovedEntrant>();

     // put elements in the list

     return entrants;
}
```

<div>
<br/>
It seems to work as expected but sometimes we noticed weird results with the default JSON serialization of JAX-RS in Glassfish 3 (maybe&nbsp;<a href="http://jersey.java.net/">Jersey</a>?):
</div>

<ul>
<li>in case of an empty list (!), it produces <span style="font-family: Courier New, Courier, monospace;">null</span>&nbsp;string output</li>
<li>if the list contains only one element, the result is the element in JSON object, instead of a JSON array with one element</li>
</ul>

<div>
<br/>
Of course, I could import the official <a href="http://json.org/java/">JSON Java library</a> and do some <span style="font-family: Courier New, Courier, monospace;">toString()</span> or object transform tricks, but I don’t want to introduce another dependency in my widely used domain project. I want to solve it in the webservice layer, without manual object / list JSON transformations. After some research I found the Jackson project which has a smarter JAX-RS JSON provider.
</div>

<div>
<br/>
First, I added the new dependency to my webservice project:
</div>

```xml
<dependency>
    <groupId>com.fasterxml.jackson.jaxrs</groupId>
    <artifactId>jackson-jaxrs-json-provider</artifactId>
    <version>2.1.4</version>
</dependency>
```

<div style="margin-bottom: 10px; margin-top: 20px;">
Then I had to modify my code a bit, but I think quite general and doesn’t contain ugly JSON objects and arrays.
</div>

```java
private static ObjectMapper mapper = new ObjectMapper();

@GET
@Produces(MediaType.APPLICATION_JSON)
@Path("/get/{param1}/{param2}")
public String getEntrants(
            @PathParam("param1") final String param1,
            @PathParam("param2") final String param2) {

     final List<ApprovedEntrant> entrants = new LinkedList<ApprovedEntrant>();

     // put elements in the list

     String out = "";
     try {
         out = mapper.writeValueAsString(entrants);
     } catch (JsonProcessingException ex) {
         //error handling
     }

     return out;
}
```
