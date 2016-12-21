app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('/', {
          url: '/',
          templateUrl: '../views/home.html',
          controller: 'homeController'
      })
      .state('rules', {
          url: '/rules',
          templateUrl: '../views/rules.html',
      })
      .state('solve', {
          url: '/solve',
          templateUrl: '../views/solve.html',
          controller: 'solveController'
      });
      $urlRouterProvider.otherwise('/');
});