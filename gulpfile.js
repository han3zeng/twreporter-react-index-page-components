
/* eslint-disable */
var gulp = require("gulp");
var babel = require("gulp-babel");
var rename = require("gulp-rename");

var theBase = { base: './src' };

gulp.task('copy', () => {
    return gulp
        .src('./src/**/*')
        .pipe(gulp.dest('lib'));
});


gulp.task('transform', ['copy'], () => {
    return gulp.src('./src/**/*.js', theBase)
        .pipe(babel({
            presets: ['stage-0']
        }))
        .pipe(gulp.dest('lib'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('./src/**/*.js', ['transform']);
});

gulp.task('default', ['watch', 'transform']);
