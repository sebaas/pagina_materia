'use strict';

/* Controllers */

myApp.controller('AppCtrl', ['$scope', '$mdSidenav', '$log' , '$location', '$mdMedia' , '$mdDialog', function($scope, $mdSidenav, $log, $location, $mdMedia, $mdDialog) {
  $scope.greeting = 'Hola!';

  $scope.toggleLeft = buildToggler('left');

  $scope.isOpenLeft = function(){
    return $mdSidenav('left').isOpen();
  };

  $scope.redirectTo = function(place) {
    $location.path("/" + place)
  }


  $scope.logIn = function(ev) {
    $mdDialog.show({
      controller: 'LogInController',
      templateUrl: 'partial/logindialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false
    })
    .then(function(answer) {
      console.log('You said your user was "' + answer + '".');
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }
  }
}]);


myApp.controller('IntroduccionCtrl', ['$scope', '$mdSidenav', '$log' , function($scope, $mdSidenav, $log) {
  $scope.name = 'Ingenieria'
}]);

myApp.controller('BibliografiaCtrl', ['$scope', '$mdSidenav', '$log' , function($scope, $mdSidenav, $log) {
  $scope.name = 'Ingenieria'
}]);

myApp.controller('ProgramaCtrl', ['$scope', '$mdSidenav', '$log' , function($scope, $mdSidenav, $log) {
  $scope.name = 'Ingenieria'
}]);


myApp.controller('LogInController', ['$scope', '$mdDialog', '$log' , function($scope, $mdDialog, $log) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}]);
