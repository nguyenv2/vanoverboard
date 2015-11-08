'use strict';

/**
 * @ngdoc function
 * @name vanoverboardApp.controller:MusingsCtrl
 * @description
 * # MusingsCtrl
 * Controller of the vanoverboardApp
 */
angular.module('vanoverboardApp')
    .controller('VanGoCtrl', ['$scope','$http','bikeshareService',
        function ($scope,$http,bikeshareService) {

            console.log('(VanGoCtrl) starting...');


            bikeshareService.getStationStatus(function(results) {
                $scope.results = results;
                console.log('results: ' + results);
            },function(err){
                //400 error - bad request
                $scope.errors=err.data;
                console.error(err.data);
            });



            $http.get("https://api.wmata.com/StationPrediction.svc/json/GetPrediction/B03&api_key=4cf4c4ec54fe4d569a1ac414036dac83")
                .success(function(response) {
                    $console.log(response);
                });



            $(function() {
                var params = {
                    // Request parameters
                };

                $.ajax({
                        url: "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/B03&",
                        beforeSend: function(xhrObj){
                            // Request headers
                            xhrObj.setRequestHeader("api_key","4cf4c4ec54fe4d569a1ac414036dac83");
                        },
                        type: "GET",
                        // Request body
                        data: "{body}",
                    })
                    .done(function(data) {
                        alert("success");
                    })
                    .fail(function() {
                        alert("error");
                    });
            });


    }]);
