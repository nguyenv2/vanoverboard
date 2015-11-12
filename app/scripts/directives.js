'use strict';

angular.module('vanoverboardApp').directive('blogTeaser',function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope : {
            pubdate : '@',
            article: '@'
        },
        //link: function(scope, elem, attrs) {
        link: function() {
          console.log('link function...');
        },
        //templateUrl: '/views/templates/blog_teaser.html'
        template:
          '<div class="blog-teaser">'+
            '<div class="col-sm-8 blog-title" ng-transclude></div>'+
            '<div class="col-sm-4 blog-pubdate text-right">{{pubdate}}</div>'+
          '</div>'
    };
});

angular.module('vanoverboardApp').directive('projectTeaser',function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope : {
            projecttitle : '@'
        },
        //link: function(scope, elem, attrs) {
        link: function() {
            console.log('link function...');
        },
        //templateUrl: '/views/templates/blog_teaser.html'
        template:
        '<div class="project-teaser">'+
            '<div class="project-title">{{projecttitle}}</div>'+
            '<div class="project-desc" ng-transclude></div>'+
        '</div>'
    };
});
