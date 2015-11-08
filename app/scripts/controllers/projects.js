'use strict';

/**
 * @ngdoc function
 * @name vanoverboardApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the vanoverboardApp
 */
angular.module('vanoverboardApp')
  .controller('ProjectsCtrl', ['$scope',
      function ($scope) {

        console.log('(ProjectsCtrl) starting...');

        $scope.loadApp = function(appName){
            window.location = "#/app/"+appName;
        };
  }]);
