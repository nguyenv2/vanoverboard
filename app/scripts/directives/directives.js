'use strict';

angular.module('vangoApp').directive('helloVan',function() {
    return {
        restrict: 'AE',
        replace: 'true',
        template: '<h3>Hello World!!</h3>'
    };
});
