/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 * Override at the last minute with global.filterSystemConfig (as plunkers do)
 */
(function (global) {

  // map tells the System loader where to look for things
  var map = {
    'app': 'app', // 'dist',
    'rxjs': 'node_modules/rxjs',
    '@angular': 'node_modules/@angular',
    '@angular2-material': 'node_modules/@angular2-material',
    'lodash': 'node_modules/lodash/lodash.js'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': { main: 'main.js', defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
  };

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router-deprecated',
    '@angular/router',
    '@angular/testing',
    '@angular/upgrade',
  ];

  var materialPackages = [
    'button',
    'card',
    'checkbox',
    'core',
    'grid',
    'icon',
    'input',
    'list',
    'progress-bar',
    'progress-circle',
    'radio',
    'sidenav',
    'toolbar'
  ];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function (pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  // add package entries for angular-material packages 
  materialPackages.forEach(function (pkgName) {
    packages['@angular2-material/' + pkgName] = { format: 'cjs', defaultExtension: 'js', main: pkgName }
  });

  var config = {
    map: map,
    packages: packages
  }

  System.config(config);

})(this);