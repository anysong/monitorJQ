var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('watch',['less'],function(){
    watch(['./src/**/*.less'],function(){
        gulp.start('less');
    })
})
