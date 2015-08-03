var gulp = require('gulp');
var browserify = require('browserify');
var chmod = require('gulp-chmod');
var vinyl = require('vinyl-source-stream');
var sources = require('../config/sources').module;

module.exports = function (){
	'use strict';

	return browserify(sources)
			.bundle()
			.pipe(vinyl('main.js'))
			.pipe(chmod(644))
			.pipe(gulp.dest('./public/javascripts/dist'));
};
