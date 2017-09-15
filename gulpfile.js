'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');

gulp.task('default', ['connect','watch']);

gulp.task('connect', function() {
  connect.server({
  	root: 'public',
    port: 404,
    livereload: true
  });
});

gulp.task('dev', ['connect','watch-dev']);

gulp.task('images', function(){
	return gulp.src('./frontend/images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./public/images'));
});

gulp.task('browserify', function() {
	return browserify('./frontend/angularApp/app.js')
	.bundle().pipe(source('main.js'))
	.pipe(gulp.dest('./frontend/temp/js/'));
});

gulp.task('sass', function() {
	return gulp.src('./frontend/sass/style.scss')
			.pipe(sass().on('error', sass.logError)).pipe(gulp.dest('./frontend/temp/css'));
});

gulp.task('minify-css', function() {
  return gulp.src('./frontend/temp/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('minify-js', function() {
  return gulp.src('./frontend/temp/js/*.js')
    .pipe(uglify({mangle:false}))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('libs', function() {
  return gulp.src('./frontend/libs/*.*')
    .pipe(gulp.dest('./public/libs/'));
});

gulp.task('minify-html', function() {
  return gulp.src('./frontend/markup/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./public/'))
});

gulp.task('brows-dev', function(){
	return browserify('./frontend/angularApp/app.js')
	.bundle().pipe(source('main.js'))
	.pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function() {
	gulp.watch('frontend/libs/**/*.*', ['libs']);
	gulp.watch('frontend/angularApp/**/*.js', ['browserify']);
	gulp.watch('frontend/temp/js/*.js', ['minify-js']);
	gulp.watch('frontend/sass/*.scss', [ 'sass' ]);
	gulp.watch('frontend/temp/**/*.css', [ 'minify-css' ]);
	gulp.watch('frontend/markup/**/*.html', ['minify-html']);
	gulp.watch('frontend/images/**/*', ['images']);
});

gulp.task('watch-dev', function(){
	gulp.watch('frontend/libs/**/*.*', ['libs']);
	gulp.watch('frontend/angularApp/**/*.js', ['brows-dev']);
	gulp.watch('frontend/sass/*.scss', [ 'sass' ]);
	gulp.watch('frontend/temp/**/*.css', [ 'minify-css' ]);
	gulp.watch('frontend/markup/**/*.html', ['minify-html']);
	gulp.watch('frontend/images/**/*', ['images']);
});