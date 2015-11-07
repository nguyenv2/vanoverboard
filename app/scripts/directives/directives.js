'use strict';

angular.module('vangoApp').directive('blogTeaser',function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
          console.log('link function...');
          scope.blogtitle = attrs.blogtitle;
          scope.pubdate = attrs.pubdate;
        },
        //templateUrl: '/views/templates/blog_teaser.html'
        template:
          '<div class="row">'+
            '<div class="col-sm-8">{{blogtitle}}</div>'+
            '<div class="col-sm-4">{{pubdate}}</div>'+
          '</div>'
    };
});
