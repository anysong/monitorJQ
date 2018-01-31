var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('watch',['less','browserify'],function(){
    watch(['./src/**/*.less'],function(){
        gulp.start('less');
    });
    watch(['./src/**/*.js'],function(){
        gulp.start('browserify');
    })
})
