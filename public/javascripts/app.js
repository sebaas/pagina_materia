'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);
 
    // $routeProvider.when("", "/introduccion")
    $routeProvider.when('/introduccion', {templateUrl: 'partial/introduccion', controller: 'IntroduccionCtrl'});
    $routeProvider.when('/programa', {templateUrl: 'partial/programa', controller: 'ProgramaCtrl'});
    $routeProvider.when('/bibliografia', {templateUrl: 'partial/bibliografia', controller: 'BibliografiaCtrl'});
    $routeProvider.otherwise({redirectTo: '/introduccion'});
  }]);