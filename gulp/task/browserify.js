var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('browserify', function(){
    return gulp.src('./src/app.js').
        pipe(browserify())
        .pipe(gulp.dest('./dest/js'));
})
