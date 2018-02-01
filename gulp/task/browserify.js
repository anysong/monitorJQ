var gulp = require('gulp');
var browserify = require('gulp-browserify');
var notify = require('gulp-notify');

gulp.task('browserify', function(){
    return gulp.src('./src/app.js').
        pipe(browserify())
        .on("error", notify.onError({
            "message": "Error: <%= error.message %>"
        }))
        .pipe(gulp.dest('./dest/js'));
})
