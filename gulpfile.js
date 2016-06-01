var del = require('del')
var path = require('path');

var gulp = require('gulp');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');





// SERVER
gulp.task('compile:server', function () {
  var tsProject = ts.createProject('src/server/tsconfig.json');
  var tsResult = gulp.src('src/server/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/server'));
});


// CLIENT
gulp.task('compile:client', function(){
	// Source files
	var tsProject = ts.createProject('src/client/tsconfig.json');
	var tsResult = gulp.src('src/client/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(ts(tsProject));
	return tsResult.js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/public'));
});

gulp.task('copy:client', function() {
  gulp.src([
    'src/client/index.html',
    'src/client/system.config.js',
    ])
    .pipe(gulp.dest('dist/public'));
})

gulp.task('copy:dependencies', function() {
  gulp.src("node_modules/**/*", {base:'node_modules'}).pipe(gulp.dest('dist/public/libs'));
})

gulp.task('copy:styles', function() {
  gulp.src([
    'src/client/app/**/*.css',
    ])
    .pipe(gulp.dest('dist/public/app'));
})


gulp.task('copy', function (callback) {
  runSequence('copy:client', 'copy:dependencies', 'copy:styles', callback);
});



gulp.task('compile', function (callback) {
  runSequence('compile:server', 'compile:client', 'copy', callback);
});

gulp.task('develop', ['server:start'], function () {
  gulp.watch('src/server/*.ts', ['compile:server']);
  // gulp.watch('/src/client/app/**/*.ts', ['compile:client']);
});


gulp.task('clean', function () {
  return del('dist');
});

// Runtime
gulp.task('server:start', function () {
  nodemon({
    script: 'dist/server/server.js',
    watch: 'dist'
  });
});


// // CLIENT
// /*
//   jsNPMDependencies, sometimes order matters here! so becareful!
// */
// var jsNPMDependencies = [
//   'angular2/bundles/angular2-polyfills.js',
//   'systemjs/dist/system.src.js',
//   'rxjs/bundles/Rx.js',
//   'angular2/bundles/angular2.dev.js',
//   'angular2/bundles/router.dev.js'
// ];

// gulp.task('compile:client', ['tslint:client'], function () {
//   // Dependencies
//   var mappedPaths = jsNPMDependencies.map(function (file) {
//     return path.resolve('node_modules', file);
//   });
//   var copyJsNPMDependencies = gulp.src(mappedPaths, { base: 'node_modules' })
//     .pipe(gulp.dest('dist/public/libs'));

//   // Source files
//   var tsProject = ts.createProject('client/tsconfig.json');
//   var tsResult = gulp.src('client/**/*.ts')
//     .pipe(sourcemaps.init())
//     .pipe(ts(tsProject));
//   return tsResult.js
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('dist/public'));
// });

// gulp.task('compile:views', function () {
//   gulp.src([
//     'client/**/*.jade',
//   ])
//     .pipe(jade({
//     }))
//     .pipe(gulp.dest('dist/public/'));
// });

// gulp.task('compile:stylus', function (finished) {
//   var exit = finished;
//   /// Note: Correct async running
//   gulp.src([
//     'client/style/main.styl',
//     'client/app/**/*.styl'
// 		])
//     .pipe(concat('all.styl'))
//     .pipe(stylus())
//     .on('error', function (err) {
//       notifier.notify({
//         title: 'Stylus compile error',
//         message: err.message
//       });
//       /// Stylus breaks on error in parts and the pipeline does
//       /// not continue. So, finish/exit here
//       exit(err);
//       exit = function () { }; /// make sure to call only once, just to be future-proof and double-safe
//     })
//     .pipe(gulp.dest('dist/public/style/'))
//     .on('end', function () {
//       exit();
//     });
// });

// gulp.task('develop', ['server:start'], function () {
//   gulp.watch('server/src/**/*.ts', ['compile:server']);
//   gulp.watch('client/app/**/*.ts', ['compile:client']);
//   gulp.watch('client/**/*.jade', ['compile:views']);
//   gulp.watch('client/**/*.styl', ['compile:stylus']);
// });

// gulp.task('bower:install', function () {
//   return bower().pipe(gulp.dest('dist/public/libs'));
// });

// gulp.task('compile', function (callback) {
//   runSequence('clean', 'compile:server', 'compile:client', 'compile:views', 'compile:stylus', 'bower:install', callback);
// });


// gulp.task('server:start', function () {
//   nodemon({
//     script: 'dist/server/src/server.js',
//     watch: 'dist/libs',
//     env: { 'NODE_ENV': 'development' }
//   });
// });

// gulp.task('clean', function () {
//   return del('dist');
// });

// gulp.task('default', ['compile']);