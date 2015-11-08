'use strict';

/**
 * @ngdoc function
 * @name vanoverboardApp.controller:MusingsCtrl
 * @description
 * # MusingsCtrl
 * Controller of the vanoverboardApp
 */
angular.module('vanoverboardApp')
  .controller('BlogCtrl', ['$scope',
    function ($scope) {

        console.log('(BlogCtrl) starting...');

        $scope.loadArticle = function(articleName){

            console.log('#/article/'+articleName);

            window.location = '#/article/'+articleName;
        };
  }]);
