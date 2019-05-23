angular
    .module('appRoutes', ["ui.router"])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    
    // $stateProvider.state({
    //     name: 'home',
    //     url: '/home',
    //     templateUrl: 'public/components/taxi/templates/home.html',
    //     controller: 'HomeController'
    // });       
    $stateProvider.state({
        name: 'taxi',
        url: '/',
        templateUrl: 'public/components/taxi/templates/taxi.template.html',
        controller: 'TaxiController'
    });
    $urlRouterProvider.otherwise('/');
    // $routeProvider
    // .when('/home', {
    //     templateUrl: 'public/components/taxi/templates/home.html',
    //     controller: 'HomeController'
    // })

    // .otherwise({ redirectTo:'/home'});
}]);