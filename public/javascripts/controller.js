'use strict';


myApp.controller('AppCtrl', ['$scope', '$mdSidenav', '$log' , '$location', '$mdMedia' , '$mdDialog', '$resource', function($scope, $mdSidenav, $log, $location, $mdMedia, $mdDialog, $resource) {
  var Menu = $resource('/api/menu/:id', {id: '@id'});

  $scope.menus = Menu.query()
  $scope.toggleLeft = buildToggler('left');
  $scope.isOpenLeft = function(){
    return $mdSidenav('left').isOpen();
  };

  $scope.redirectTo = function(place) {
    $mdSidenav("left").toggle()
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
      $mdSidenav(navID).toggle()
    }
  }
}]);


myApp.controller('IntroduccionCtrl', ['$scope', '$resource', '$log' , function($scope, $resource, $log) {
  var Introduccion = $resource('/api/introduccion/:id', {id: '@id'});
  $scope.intros = Introduccion.query(function() {
    $scope.intro = $scope.intros[0];
  });
}]);

myApp.controller('BibliografiaCtrl', ['$scope', '$resource', '$log' , function($scope, $resource, $log) {
  var Bibliografia = $resource('/api/bibliografia/:id', {id: '@id'});
  $scope.edit_index = -1;
  $scope.biblio = Bibliografia.query();
  $scope.addBiblio = function(){
    $scope.biblio.push({materia:"ingsoft2", titulo:"Título", escritores:"Autores", ano:"2016"})
  };
  $scope.delBiblio = function(index){
    $scope.biblio.splice(index,1);
  };
  $scope.editBiblio = function(index){
    $scope.edit_index = index;
  };
}]);

myApp.controller('MaterialCtrl', ['$scope', '$resource', '$log' , function($scope, $resource, $log) {
  var Material = $resource('/api/material/:id', {id: '@id'});
  $scope.edit_index = -1;
  $scope.materiales = Material.query();
  // $scope.addBiblio = function(){
  //   $scope.biblio.push({materia:"ingsoft2", titulo:"Título", escritores:"Autores", ano:"2016"})
  // };
  // $scope.delBiblio = function(index){
  //   $scope.biblio.splice(index,1);
  // };
  // $scope.editBiblio = function(index){
  //   $scope.edit_index = index;
  // };
}]);

myApp.controller('ContribucionCtrl', ['$scope', '$resource', '$log' , function($scope, $resource, $log) {
  var Contribucion = $resource('/api/contribucion/:id', {id: '@id'});
  $scope.edit_index = -1;
  $scope.contribuciones = Contribucion.query();
  // $scope.addBiblio = function(){
  //   $scope.biblio.push({materia:"ingsoft2", titulo:"Título", escritores:"Autores", ano:"2016"})
  // };
  // $scope.delBiblio = function(index){
  //   $scope.biblio.splice(index,1);
  // };
  // $scope.editBiblio = function(index){
  //   $scope.edit_index = index;
  // };
}]);

myApp.controller('LinkCtrl', ['$scope', '$resource', '$log' , function($scope, $resource, $log) {
  var Link = $resource('/api/link/:id', {id: '@id'});
  $scope.edit_index = -1;
  $scope.links = Link.query();
  // $scope.addBiblio = function(){
  //   $scope.biblio.push({materia:"ingsoft2", titulo:"Título", escritores:"Autores", ano:"2016"})
  // };
  // $scope.delBiblio = function(index){
  //   $scope.biblio.splice(index,1);
  // };
  // $scope.editBiblio = function(index){
  //   $scope.edit_index = index;
  // };
}]);

myApp.controller('ProgramaCtrl', ['$scope', '$resource', '$log' , function($scope, $resource, $log) {
  var Programa = $resource('/api/programa/:id', {id: '@id'});
  $scope.programas = Programa.query();

}]);

myApp.controller('DocenteCtrl', ['$scope', '$resource', '$log', '$mdDialog' , function($scope, $resource, $log, $mdDialog) {
  var Docente = $resource('/api/docente/:id', {id: '@id'});
  var docentes = Docente.query(function() {
    $scope.docentes = _.groupBy(docentes, 'cargo');
    $scope.filters = {active:true};
  });
  $scope.toggleActive = function() {
    $scope.filters = $scope.editMode ? {active:true} : {}
    $scope.editMode = !$scope.editMode
  };
  $scope.toggleDocente = function(docente) {
    docente.active = !docente.active
    var newDocente = new Docente();
    angular.extend(newDocente, docente);
    newDocente.$save();
  };
  $scope.addDocente = function() {

  };
  $scope.editDocente = function(docente) {
    $mdDialog.show({
      controller: 'DocenteEditController',
      templateUrl: 'partial/editdocente',
      locals: {docente: angular.copy(docente)},
      parent: angular.element(document.body),
      clickOutsideToClose:true,
      fullscreen: true
    })
    .then(function(docente_edit) {
      if(docente.cargo == docente_edit.cargo) {
        $scope.docentes[docente_edit.cargo][$scope.docentes[docente.cargo].indexOf(docente)] = docente_edit
      }
      else {
        if(docente.nombre != undefined) {
          $scope.docentes[docente_edit.cargo].splice($scope.docentes[docente.cargo].indexOf(docente), 1)
        }
        if(_.has($scope.docentes, docente_edit.cargo)) {
          $scope.docentes[docente_edit.cargo].push(docente_edit)
        } else {
          $scope.docentes[docente_edit.cargo] = [docente_edit]
        }
      }
      var newDocente = new Docente();
      angular.extend(newDocente, docente_edit);
      newDocente.$save();
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };
}]);

myApp.controller('ForoCtrl', ['$scope', '$resource', '$log' , function($scope, $resource, $log) {

}]);

myApp.controller('EvaluacionCtrl', ['$scope', '$resource', '$log' , function($scope, $resource, $log) {
  var Examen = $resource('/api/examen/:id', {id: '@id'});
  $scope.examenes = Examen.query();
}]);

myApp.controller('CronogramaCtrl', ['$scope', '$resource', '$log' , '$filter', 'MaterialCalendarData', function($scope, $resource, $log, $filter, MaterialCalendarData) {
    $scope.dayFormat = "d";

    // To select a single date, make sure the ngModel is not an array.
    $scope.selectedDate = null;

    // If you want multi-date select, initialize it as an array.
    $scope.selectedDate = [];

    $scope.firstDayOfWeek = 0; // First day of the week, 0 for Sunday, 1 for Monday, etc.
    $scope.setDirection = function(direction) {
      $scope.direction = direction;
      $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };

    $scope.dayClick = function(date) {
      alert("You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z"));
    };

    $scope.prevMonth = function(data) {
      $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    };

    $scope.nextMonth = function(data) {
      $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
    };

    $scope.tooltips = true;
    $scope.addContent = function() {
      var today = new Date();
      MaterialCalendarData.setDayContent(today,'<div class="md-raised md-button md-ink-ripple"> Practica </div>')

    }

    $scope.setDayContent = function(date) {

        // // You would inject any HTML you wanted for
        // // that particular date here.
        if (moment(date).isSame(moment(Date.now()), 'day')) {
          return '<div class="md-raised md-button md-ink-ripple"> Examen </div>';
        }
        else {
          return "<p> </p>";
        }

        // // You could also use an $http function directly.
        // return $http.get("/some/external/api");

        // // You could also use a promise.
        // var deferred = $q.defer();
        // $timeout(function() {
        //     deferred.resolve("<p></p>");
        // }, 1000);
        // return deferred.promise;

    };
}]);

myApp.controller('EditCtrl', ['$scope', '$resource', '$log' , function($scope, $resource, $log) {
  var Introduccion = $resource('/api/introduccion/:id', {id: '@id'});
  $scope.intros = Introduccion.query(function() {
    $scope.intro = $scope.intros[0];
  });
  $scope.saveIntro = function() {
    $scope.intro.$save()
  }
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


myApp.controller('DocenteEditController', ['$scope', '$mdDialog', 'docente' , function($scope, $mdDialog, docente) {
  $scope.docente = docente;
  if(docente.nombre == undefined) {
    $scope.new_docente = true;
  }
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.done = function(docente) {
    $mdDialog.hide(docente);
  };
}]);
