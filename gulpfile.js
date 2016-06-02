var del = require('del')
var path = require('path');

var gulp = require('gulp');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');

/**
 * Compilation Tasks
 * 
 * - compile:server
 * - compile:client
 * 
 */


/**
 * Compile:Server
 */
gulp.task('compile:server', function () {
  var tsProject = ts.createProject('src/server/tsconfig.json');
  var tsResult = gulp.src('src/server/**/*.ts')
    //.pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  tsResult.js
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/server'));
});


/**
 * Compile:Client
 */
gulp.task('compile:client', function(){
	var tsProject = ts.createProject('src/client/tsconfig.json');
	var tsResult = gulp.src('src/client/**/*.ts')
		//.pipe(sourcemaps.init())
		.pipe(ts(tsProject));
	return tsResult.js
		//.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/public'));
});

/**
 * Copy Tasks
 * 
 * - copy:client
 * - copy:dependencies
 * - copy:styles
 */

/**
 * Copy:Clean
 */
gulp.task('copy:client', function() {
  gulp.src([
    'src/client/index.html',
    'src/client/system.config.js',
    ])
    .pipe(gulp.dest('dist/public'));
})

/**
 * Copy:Dependencies (Prod mode)
 */
gulp.task('copy:dependencies', function() {
  gulp.src("node_modules/**/*", {base:'node_modules'}).pipe(gulp.dest('dist/public/libs'));
})

/**
 * Copy:Dependencies (Dev mode)
 */
gulp.task('copy:dependencies:dev', function() {
  gulp.src("node_modules/**/*", {base:'node_modules'}).pipe(gulp.dest('dist/public/libs'));
})

/**
 * Copy:Styles
 */
gulp.task('copy:styles', function() {
  gulp.src([
    'src/client/app/**/*.css',
    ])
    .pipe(gulp.dest('dist/public/app'));
    
   gulp.src([
    'public/**/*',
    ])
    .pipe(gulp.dest('dist/public'));
})

/**
 * Barrel Tasks
 * 
 * - copy
 * - compile
 * - build
 * 
 */

gulp.task('copy', function (callback) {
  runSequence('copy:client', 'copy:dependencies', 'copy:styles', callback);
});

gulp.task('compile', function (callback) {
  runSequence('compile:server', 'compile:client', callback);
});

gulp.task('build', function (callback) {
  runSequence('dev:clean', 'compile', 'copy', callback);
});


/**
 * Development Tasks
 * 
 * - dev:watch
 * - dev:clean
 * - dev:start
 */

/**
 * 
 */
gulp.task('dev:watch', ['dev:start'], function () {
  gulp.watch('src/server/*.ts', ['compile:server']);
  gulp.watch('src/client/app/**/*.ts', ['compile:client']);
  gulp.watch('src/client/app/**/*.css', ['copy:styles']);
});

/**
 * 
 */
gulp.task('dev:clean', function () {
  return del('dist');
});

/**
 * 
 */
gulp.task('dev:start', function () {
  nodemon({
    script: 'dist/server/server.js',
    watch: 'dist'
  });
});

/**
 * Production Tasks
 * 
 */

/**
 * `start`
 */
gulp.task('start', function() {
	nodemon({
		script: 'dist/server/server.js',
		env: { 'NODE_ENV': 'production' }
	});
});

/**
 * Default Task  
 * 
 * Performs a quick compile, and then begins developer-mode watch
 */ 
gulp.task('default', function (callback) {
  runSequence('compile', 'dev:watch', callback);
});