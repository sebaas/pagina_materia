myApp.directive('biblioItem', function(){
  var controller = function($scope) {
    $scope.editmode = false;
    $scope.editNote = function() {
      $scope.editmode = !$scope.editmode;
    };
  };
   return {
     restrict: 'E',
     scope:{book:"=",
        del:"&",
        index:"="},
     templateUrl:"partial/biblio-item",
    controller: controller
   };
});
