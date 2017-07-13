/* eslint-disable */
var gulp = require("gulp")
var babel = require("gulp-babel")

var theBase = { base: './src' }

var dest = 'lib'

function copy() {
  return gulp
    .src('./src/**/*')
    .pipe(gulp.dest(dest))
}

function transpile() {
  return gulp.src('./src/**/*.js', theBase)
    .pipe(babel({
        presets: ['stage-0']
    }))
    .pipe(gulp.dest(dest))
}

function watch() {
  gulp.watch('./src/**/*.js', transpile)
}

var build = gulp.series(copy, transpile, watch)

gulp.task('default', build)
