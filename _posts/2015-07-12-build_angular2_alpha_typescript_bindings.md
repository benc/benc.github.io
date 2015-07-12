---
layout: post
title: "Build up-to-date Typescript bindings for Angular 2 developer preview"
date: 2015-07-12 15:00:00
categories: blog
comments: true
---

Angular 2 is in Developer preview, and it's a fun framework to play with. Since I'm using Typescript, I need up-to-date Typescript bindings.

At the time of writing, [the typescript bindings published for the Angular 2 alpha builds is sometimes lagging behind](https://github.com/borisyankov/DefinitelyTyped/tree/master/angular2).

So I'm building them myself.

<!-- more -->

* Check out the Angular2 repository

      git clone git@github.com:angular/angular.git; cd angular

* Switch to the tag of the alpha you want to generate typings from. I'm using `2.0.0-alpha.30` at the time of writing.

  	git checkout 2.0.0-alpha.30

* Install the necessary dependencies:

  	npm install

* Angular 2 typings are built using [dgeni](https://github.com/angular/dgeni), which you can trigger by running the corresponding gulp task:

  	gulp docs

You can find the generated typings for `angular2` and `router` in `./dist/docs/typings/angular2`.
