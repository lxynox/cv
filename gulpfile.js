var gulp = require('gulp');

var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var env = require('gulp-environment');

var paths = {
  sources:['_config.yml', '**/*.js', '**/*.html', '**/*.scss','!_site', '!bower_components', '!node_modules'],
  scripts: 'js/**/*.js',
  vendors: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/fullpage.js/dist/*.min.*s', 'bower_components/typed.js/dist/typed.min.js']
};

gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('scripts',['clean'], function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(env.if.production(uglify()))
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build'));
});

gulp.task('vendors', function() {
  return gulp.src(paths.vendors)
    .pipe(gulp.dest('vendor'));
});

var exec = require('child_process').exec;
gulp.task('jekyll', function(cb) {
  exec('bundle exec jekyll build', function(err) {
    if (err) cb(err);
    cb();
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.sources, ['jekyll']);
});

gulp.task('default', ['watch', 'vendors', 'jekyll', 'scripts']);
