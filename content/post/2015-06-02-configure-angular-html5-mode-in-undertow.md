---
categories: blog
comments: true
date: 2015-06-02T22:00:00Z
title: Configure Angular HTML 5 mode in Undertow
url: /2015/06/02/configure-angular-html5-mode-in-undertow/
---

[Undertow](http://undertow.io) is the default web server in the [Wildfly Application Server](http://wildfly.org). You can also use it as an embedded webserver.

To use [Angular HTML5 mode](https://docs.angularjs.org/guide/$location#hashbang-and-html5-modes) effectively, we need some rewrite rules to direct traffic to our Angular single-page application. Undertow support rewrite rules through a predicate. This article outlines how you can write a predicate and apply it to your code.

<!--more-->

Note: these rules can be easily used for any single-page application framework.

## An example

This example assumes that:

* Our context path is `/app`. We don't want to rewrite either `/app` or `/app/`.
* Our Angular application lives at `/app/index.html`.
* Our CSS is located at `/app/css/`.
* Our JS is located at `/app/js/`.
* Our images are placed in `/app/images/`.
* The backend REST service is served at the `/app/rest/` path.

All of these prerequisites need to be filtered out. The predicate that conforms with the example we've outlined above results in:

	not equals[%R, '/app'] and
	not equals[%R, '/app/'] and
	not equals[%R, '/app/index.html'] and
	not path-prefix['/app/css/'] and
	not path-prefix['/app/js/'] and
	not path-prefix['/app/images/'] and
	not path-prefix['/app/rest/'] and
	regex['/app/.+'] -> rewrite['/km/index.html']

A hit on `/app/foo/bar/` will resolve to our Angular appo running at `/app/index.html` Requests to stylesheets, javascript files or our REST service will pass through.

This predicate can be used inside a Undertow configuration file (`undertow-handlers.conf`, out of scope of this article), or be used in code as a Undertow handler.

## Get the rewrite rules working using code

This option is more likely what you want if you're running Undertow embedded. You can configure Undertow in code through a chain of handlers. Undertow ships with [several built-in handlers](http://undertow.io/undertow-docs/undertow-docs-1.2.0/index.html#built-in-handlers), one of them is the Predicate handler:

	Handlers.predicates(
	    PredicatedHandlersParser.parse("the predicate we've just written"),
	    nextHandler);

Note: Undertow uses the [`PredicatedHandlersParser`](https://github.com/undertow-io/undertow/blob/master/core/src/main/java/io/undertow/server/handlers/builder/PredicatedHandlersParser.java) class we've used in this example internally to parse the `undertow-handlers.conf` file, so you're essentially doing the same thing as using the configuration file.

## More information

If you need additional information, check these resources:

* [Undertow documentation](http://undertow.io/undertow-docs/undertow-docs-1.2.0/predicates-attributes-handlers.html)
* [PredicateParsingTestCase.java](https://github.com/undertow-io/undertow/blob/master/core/src/test/java/io/undertow/predicate/PredicateParsingTestCase.java)
