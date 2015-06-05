'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var order = require('gulp-order');
var debug = require('gulp-debug');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');

var errorHandler = notify.onError(function(error) {
  gutil.log(error.plugin + ' ERROR ' + error);
  return error.plugin + ' ' + error.name;
});

gulp.task('sass', function() {
  var sassOpts = {
    errLogToConsole: true,
    onError: browserSync.notify
  };

  return gulp.src(['./_sass/**/*.sass', './_sass/**/*.scss'])
    .pipe(order([
      '**/_base.scss',
      '**/_layout.scss',
      '**/_heavy_industries.sass',
      '**/*.sass',
      '**/*.scss'
    ]))
    .pipe(debug())
    .pipe(sass(sassOpts).on('error', errorHandler))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('./css'));
});
