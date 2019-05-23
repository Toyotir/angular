'use strict';

var taxi = angular.module("taxi", []);

angular
    .module('SampleApplication', [
        'appRoutes',
        'taxi',
        'ngResource'
    ]);