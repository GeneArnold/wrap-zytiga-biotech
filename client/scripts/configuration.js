import Constants from './constants';

var configuration = function($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push('TokenInterceptor');

  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController',
      access: {
        requiredLogin: false
      }
    }).when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl',
      access: {
        requiredLogin: true
      }
    }).otherwise({
      redirectTo: '/login'
    });
};

configuration.$inject = ['$routeProvider', '$httpProvider'];

export default configuration;