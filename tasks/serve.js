'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browserSync', ['sass', 'jekyll:build'], function () {
  browserSync({
    server: {
      baseDir: '_site'
    },
    port: 9000,
    ui: {
      port: 9001
    },
    open: false
  });

  gulp.watch('_sass/**/*.sass', ['sass']);
  gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', 'admin/*', '_posts/*', 'docs/*.md', 'img/*', 'js/*.js'], ['jekyll:rebuild']);
});

gulp.task('build', ['sass', 'jekyll:build']);

gulp.task('serve', ['build', 'browserSync']);
