/*
	Use of this task assumes a .jscsrc file in the
	same directory as your gulpfile.js

	More Information:
		https://www.npmjs.org/package/gulp-jscs
		https://github.com/jscs-dev/node-jscs
 */

var gulp = require('gulp');
var jscs = require('gulp-jscs');
var sources = require('../config/sources').js

module.exports = function () {
	'use strict';

	return gulp.src(sources)
			.pipe(jscs())
			.pipe(jscs.reporter('fail'));
};
