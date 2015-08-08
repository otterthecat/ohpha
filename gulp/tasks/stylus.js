var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jeet = require('jeet');
var rupture = require('rupture');
//Paths
var sources = require('../config/sources').css


module.exports = function(){
  'use strict';

  return gulp.src(sources)
    .pipe(stylus({
      use:[jeet(), rupture()],
    }))
    .pipe(gulp.dest('./public/stylesheets'));
};