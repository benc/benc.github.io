'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var shell = require('gulp-shell');

gulp.task('jekyll:build', function() {
  browserSync.notify('<span style="color: grey">Running:</span> $ jekyll build');

  return gulp.src('')
    .pipe(shell('jekyll build'));
});

gulp.task('jekyll:rebuild', ['jekyll:build'], function() {
  browserSync.reload();
});
