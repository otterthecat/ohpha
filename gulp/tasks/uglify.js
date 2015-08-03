var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sources = require('../config/sources').public;

module.exports = function (){
	gulp.src(sources.js)
		.pipe(uglify())
		.pipe(gulp.dest('./public/js'));
};
