var gulp = require('gulp');
var bump = require('gulp-bump');

module.exports = function () {
	'use strict';

	return gulp.src('./package.json')
				.pipe(bump({type : 'minor'}))
				.pipe(gulp.dest('./'));
};
