var gulp = require('gulp');

var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var paths = {
  scripts: 'js/**/*.js',
  vendors: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/fullpage.js/dist/*.min.*s', 'bower_components/typed.js/dist/typed.min.js']
};

gulp.task('clean', function() {
  return del(['js/build']);
});

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js/build'));
});

gulp.task('vendors', function() {
  del(['vendor']);
  return gulp.src(paths.vendors)
    .pipe(gulp.dest('vendor'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['watch', 'vendors', 'scripts']);
