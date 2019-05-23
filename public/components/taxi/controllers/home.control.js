taxi
    .controller('HomeController',function($scope,$window) {
        $scope.message = "Bienvenue dans Taxi Mangager " ;
        $scope.redirect = $window.location.href='public/components/taxi/templates/taxi.template.html';
    });
    // .config(['$stateProvider','$routeProvider', '$urlRouterProvider', function($stateProvider,$routeProvider, $urlRouterProvider) {     
    //     $stateProvider.state({
    //         name: 'taxi',
    //         url: '/society',
    //         templateUrl: 'public/components/taxi/templates/taxi.template.html',
    //         controller: 'TaxiController'
    //     })
    // }])


    // .config(['$stateProvider','$routeProvider', '$urlRouterProvider', function($stateProvider,$routeProvider, $urlRouterProvider) {
    //     redirect = function(){
    //         $stateProvider.state({
    //             name: 'taxi',
    //             url: '/society',
    //             templateUrl: 'public/components/taxi/templates/taxi.template.html',
    //             controller: 'TaxiController'
    //         });
    //     }
    // }])
