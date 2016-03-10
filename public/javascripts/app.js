'use strict';
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngResource', 'ngSanitize','materialCalendar']).
  config(['$routeProvider', '$locationProvider','$mdThemingProvider', function($routeProvider, $locationProvider, $mdThemingProvider) {
    //$locationProvider.html5Mode(true);

  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('orange');

    $routeProvider.when('/introduccion', {templateUrl: 'partial/introduccion', controller: 'IntroduccionCtrl'});
    $routeProvider.when('/programa', {templateUrl: 'partial/programa', controller: 'ProgramaCtrl'});
    $routeProvider.when('/bibliografia', {templateUrl: 'partial/bibliografia', controller: 'BibliografiaCtrl'});
    $routeProvider.when('/edit', {templateUrl: 'partial/edit', controller: 'EditCtrl'});
    $routeProvider.when('/docentes', {templateUrl: 'partial/docentes', controller: 'DocenteCtrl'});
    $routeProvider.when('/material', {templateUrl: 'partial/material', controller: 'MaterialCtrl'});
    $routeProvider.when('/links', {templateUrl: 'partial/links', controller: 'LinkCtrl'});
    $routeProvider.when('/contribuciones', {templateUrl: 'partial/contribuciones', controller: 'ContribucionCtrl'});
    $routeProvider.when('/evaluaciones', {templateUrl: 'partial/evaluaciones', controller: 'EvaluacionCtrl'});
    $routeProvider.when('/cronograma', {templateUrl: 'partial/cronograma', controller: 'CronogramaCtrl'});
    $routeProvider.when('/foro', {templateUrl: 'partial/foro', controller: 'ForoCtrl'});



    $routeProvider.otherwise({redirectTo: '/introduccion'});
  }]);