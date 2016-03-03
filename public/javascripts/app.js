'use strict';
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngResource']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);
 
    $routeProvider.when('/introduccion', {templateUrl: 'partial/introduccion', controller: 'IntroduccionCtrl'});
    $routeProvider.when('/programa', {templateUrl: 'partial/programa', controller: 'ProgramaCtrl'});
    $routeProvider.when('/bibliografia', {templateUrl: 'partial/bibliografia', controller: 'BibliografiaCtrl'});
    $routeProvider.when('/edit', {templateUrl: 'partial/edit', controller: 'EditCtrl'});

    $routeProvider.otherwise({redirectTo: '/introduccion'});
  }]);