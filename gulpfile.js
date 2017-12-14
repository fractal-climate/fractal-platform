var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('build:sass', function() {

	return gulp.src('app/sass/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/static/css'))
});

gulp.task('build:js', function() {

	return gulp.src('app/js/*.js')
		.pipe(gulp.dest('dist/static/js'))
});


gulp.task('build:templates', function() {

	return gulp.src('app/templates/*.html')
		.pipe(gulp.dest('dist/templates'))
});


gulp.task('build:data', function() {

	return gulp.src('app/data/*')
		.pipe(gulp.dest('dist/static/data'))
});


gulp.task('build:app', function() {

	return gulp.src('app/app.py')
		.pipe(gulp.dest('dist'))
});

gulp.task('build', ['build:app', 'build:js', 'build:data', 'build:sass', 'build:templates'], function() {});


gulp.task('watch', function() {
	gulp.watch('app/*/*', ['build']);
})
