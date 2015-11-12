'user strict'

angular.module('vanoverboardApp').filter('kelvinToFahrenheit', function() {
  return function(input) {
    return Math.round( 1.8*(input - 273) + 32);
  };
});
