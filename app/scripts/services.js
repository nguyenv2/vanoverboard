'use strict';

angular.module('vanoverboardApp').factory('bikeshareService', function($resource) {
    return $resource('https://www.capitalbikeshare.com/data/stations/bikeStations.xml',
        {
            action: '@action',
            Id: '@Id'
        },
        {
            getStationStatus: {
                method: 'GET',
                withCredentials: true
            }
        }
    );
});



