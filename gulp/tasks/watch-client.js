var gulp = require('gulp');
var sources = require('../config/sources');
var options = require('../config/options');
var browserSync = require('browser-sync');

module.exports = function () {

	browserSync({
		proxy: options.browserSync.proxy
	});

	return gulp.watch(
				[sources.app],
				['browserify', 'stylus', browserSync.reload]
			);
};
