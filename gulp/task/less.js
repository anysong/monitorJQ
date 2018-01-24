var gulp = require('gulp');
var less = require('gulp-less');
var notify = require('gulp-notify');

gulp.task('less',function(){
    gulp.src('./src/css/*.less')
    .pipe(less())
    .on('error',function(){
        notify.onError({
            'message': 'Error:<%= error.message %>'
        })
    })
    .pipe(gulp.dest('./src/css'));
})
