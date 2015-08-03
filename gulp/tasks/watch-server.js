var gulp = require('gulp');
var sources = require('../config/sources');
var browserSync = require('browser-sync');
var options = require('../config/options');

module.exports = function () {
    'use strict';

	browserSync({
		proxy: options.browserSync.proxy
	});

	return gulp.watch(
				[sources.js],
				['jscs', 'jshint', 'browserify', browserSync.reload]
			);
};
