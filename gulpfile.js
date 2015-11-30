var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('default',function(){
	console.log('this is gulp');
});

gulp.task('log', function(){
  gutil.log('Workflows are awesome');
});
