'use strict';

/**
 * @ngdoc overview
 * @name vanoverboardApp
 * @description
 * # vanoverboardApp
 *
 * Main module of the application.
 */
angular
  .module('vanoverboardApp', [
      'ngAnimate',
      'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/blog', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl'
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl'
      })

      // Articles
      .when('/article/gulp-vs-grunt', {
            templateUrl: 'views/article/gulp-vs-grunt.html',
            controller: 'BlogCtrl'
      })

      // Projects
      .when('/app/vanGo', {
        templateUrl: 'views/app/vanGo.html',
        controller: 'VanGoCtrl'
      })
      .when('/app/vanEats', {
        templateUrl: 'views/app/vanEats.html',
        controller: 'VanEatsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
