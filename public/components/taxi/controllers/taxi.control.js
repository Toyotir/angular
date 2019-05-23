taxi
    .controller('TaxiController',function($scope, Driver, Car, Society) {
        Driver.query().$promise.then(function(data) {
            $scope.drivers = data;
        });
        Car.query().$promise.then(function(data) {
            $scope.cars = data;
        });
        Society.query().$promise.then(function(data) {
            $scope.societies = data;
        });
});