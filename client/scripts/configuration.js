import Constants from './constants';

const useAuthentication = Constants.ACTIVE_FEATURES.authentication;

var configuration = function($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push('TokenInterceptor');

  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController',
      controllerAs: 'homeCtrl',
      access: {
        requiredLogin: true
      }
    }).otherwise({
      redirectTo: '/'
    });

  if (useAuthentication) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        controllerAs: 'loginCtrl',
        access: {
          requiredLogin: false
        }
      });
  }
};

configuration.$inject = ['$routeProvider', '$httpProvider'];

export default configuration;