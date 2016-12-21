app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('/', {
          url: '/',
          templateUrl: '../views/home.html',
          controller: 'playController'
      })
      .state('solve', {
          url: '/solve',
          templateUrl: '../views/solve.html',
          controller: 'solveController'
      })
      .state('rules', {
          url: '/rules',
          templateUrl: '../views/rules.html',
      });
      $urlRouterProvider.otherwise('/');
});