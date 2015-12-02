var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');


var coffeeSources = ['components/coffee/tagline.coffee'];

var jsSources = [
  'app/scripts/*.js',
  'app/scripts/controllers/*.js',
  'app/scripts/controllers/apps/*.js',
];

var sassSources = ['app/styles/main.scss'];



gulp.task('default',function(){
	console.log('this is gulp');
});

gulp.task('log', function(){
  gutil.log('Workflows are awesome');
});

gulp.task('coffee', function(){
  gulp.src(coffeeSources)
    .pipe(coffee({bare:true})
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulp.dest('target/scripts'));
})

gulp.task('compass', ['js'], function() {
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'app/styles/sass',
            image: 'app/images',
            style: 'expanded'
        }))
        .on('error',gutil.log)
        .pipe(gulp.dest('target/styles'));
})


gulp.task('all', ['js','compass']);

gulp.task('default', ['js','compass']);