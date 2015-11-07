'use strict';

angular.module('vangoApp').directive('blogTeaser',function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs, ctrl) {
          console.log('link function...');
          console.log(attrs);
          scope.blogtitle = attrs.blogtitle;
          scope.pubdate = attrs.pubdate;
        },
        templateUrl: '/views/templates/blog_teaser.html'
    };
});
