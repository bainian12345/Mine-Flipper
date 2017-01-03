app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('/', {
          url: '/',
          templateUrl: '../views/play.html',
          controller: 'playController'
      })
      .state('ai', {
          url: '/ai',
          templateUrl: '../views/play.html',
          controller: 'aiController'
      })
      .state('rules', {
          url: '/rules',
          templateUrl: '../views/rules.html',
      });
      $urlRouterProvider.otherwise('/');
});