var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
});

gulp.task('javascript', function() {
    /* combine app js */
	gulp.src('./js/*.js')
    	.pipe(concat('app.js'))
    	.pipe(gulp.dest('./'));
    //browserify app.js --s module > bundle.js;
});

//Watch task
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles'])
    gulp.watch('./js/*.js', ['javascript'])
});
