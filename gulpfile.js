var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    Server = require('karma').Server,
    header = require('gulp-header');
    
var sequence = require('run-sequence');
var pkg = require('./package.json');
var config = require('./config/build.conf');

gulp.task('build', function(){
    return gulp.src(config.oopsieFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('oopsie.min.js'))
        .pipe(uglify())
        .pipe(header(config.banner, { pkg : pkg } ))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task('tdd', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('ci', function(done) {

    runSequence('build', 'ci-test', function() {
        done();
    });

});

gulp.task('ci-test', function (done) {
  new Server({
    configFile: __dirname + '/karma.build.conf.js',
    singleRun: true
  }, done).start();
});
