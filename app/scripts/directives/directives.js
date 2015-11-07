'use strict';

angular.module('vangoApp').directive('blogTeaser',function() {
    return {
        restrict: 'E',
        transclude: true,
        link: function(scope, elem, attrs) {
          console.log('link function...');
          scope.pubdate = attrs.pubdate;
        },
        //templateUrl: '/views/templates/blog_teaser.html'
        template:
          '<div class="row">'+
            '<div class="col-sm-8 blog-title" ng-transclude></div>'+
            '<div class="col-sm-4 text-right">{{pubdate}}</div>'+
          '</div>'
    };
});

angular.module('vangoApp').directive('projectTeaser',function() {
    return {
        restrict: 'E',
        transclude: true,
        link: function(scope, elem, attrs) {
            console.log('link function...');
            scope.projecttitle = attrs.projecttitle;
            scope.projectdesc = attrs.projectdesc;
            console.log(attrs);
            console.log(elem);
        },
        //templateUrl: '/views/templates/blog_teaser.html'
        template:
        '<div class="project-title">{{projecttitle}}</div>'+
        '<div class="project-desc" ng-transclude></div>'
    };
});
