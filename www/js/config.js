function config($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider
      .when('/', {
          templateUrl: '../views/home.html',
          controller: 'homeController'
      })
      .when('/rules', {
          templateUrl: '../views/plant.html',
      })
      .when('/solve', {
          templateUrl: '../views/solve.html',
          controller: 'solveController'
      })
      .otherwise({
          redirectTo: '/'
      });
}