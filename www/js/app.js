var moduleName = "app";
var app = angular.module(moduleName, [
  'ionic'])
  .config(function($stateProvider, $urlRouterProvider) {
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
})
  .controller('homeController', ['$scope', '$http', '$location', homeController])
  .controller('solveController', ['$scope', '$http', '$location', solveController])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

function homeController($scope, $http, $location) {
  console.log("home");
  alert('homeController');
}

function solveController($scope, $http, $location) {
  alert("solveController");
}

