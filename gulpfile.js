var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass   = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jade   = require('gulp-jade');

// lint task
gulp.task('lint', function() {
  return gulp.src('dev/js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

// compile sass
gulp.task('sass', function() {
  return gulp.src('dev/scss/*.scss')
      .pipe(concat('all.scss'))
      .pipe(sass())
      .pipe(rename('styles.css'))
      .pipe(gulp.dest('site/css'));
});

// concatenate and minify js
gulp.task('scripts', function() {
  return gulp.src('dev/js/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('site/js'))
      .pipe(rename('all.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('site/js'));
});

// compile jade
gulp.task('jade', function() {
  return gulp.src('dev/jade/*.jade')
      .pipe(jade( {pretty:true} ))
      .pipe(gulp.dest('site/'));
});

// watch files for changes
gulp.task('watch', function() {
  gulp.watch('dev/js/*.js', ['lint', 'scripts']);
  gulp.watch('dev/scss/*.scss', ['sass']);
  gulp.watch('dev/jade/*.jade', ['jade']);
});

// default task
gulp.task('default', ['lint', 'sass', 'scripts', 'jade', 'watch']);