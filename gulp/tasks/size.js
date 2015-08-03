var gulp = require('gulp');
var size = require('gulp-size');
var options = require('../config/options');
var sources = require('../config/sources');

module.exports = function () {
	'use strict';

	return gulp.src(sources.app)
			.pipe(size(options.size))
};
