+++
date = '2013-03-10T12:51:00+01:00'
title = 'Proper JSON output with JAX-RS'
slug = 'proper-json-output-with-jax-rs'
tags = ['coding', 'java', 'json', 'rest']
keywords = ['']
languages = ['en']
+++

I had to develop a [REST webservice](http://en.wikipedia.org/wiki/Representational_state_transfer#RESTful_web_services) endpoint recently in our JavaEE application. After we figured out what data the client needs we came to an agreement that we will produce [JSON](http://www.json.org/) output. I knew [JAX-RS](http://jax-rs-spec.java.net) can do that, so I simply wrote a method like this:

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

It seems to work as expected but sometimes we noticed weird results with the default JSON serialization of JAX-RS in Glassfish 3 (maybe [Jersey](http://jersey.java.net)?):

* in case of an empty list (!), it produces `"null"` string output
* if the list contains only one element, the result is the element in JSON object, instead of a JSON array with one element

Of course, I could import the official [JSON Java library](http://json.org/java/) and do some `toString()` or object transform tricks, but I don’t want to introduce another dependency in my widely used domain project. I want to solve it in the webservice layer, without manual object / list JSON transformations. After some research I found the Jackson project which has a smarter JAX-RS JSON provider.

First, I added the new dependency to my webservice project:

```xml
<dependency>
    <groupId>com.fasterxml.jackson.jaxrs</groupId>
    <artifactId>jackson-jaxrs-json-provider</artifactId>
    <version>2.1.4</version>
</dependency>
```

Then I had to modify my code a bit, but I think it's quite normal and doesn’t contain ugly JSON objects and arrays.

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
