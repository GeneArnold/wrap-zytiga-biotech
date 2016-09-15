import Constants from './constants';
import Utils from './utils.js';

var run = function($rootScope, $window, $location, AuthenticationService) {
  // Utils.resize();
  AuthenticationService.check();


  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationService.isLogged) {
      $location.path("/login");
    }
  });

  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = AuthenticationService.isLogged;
    $rootScope.role = AuthenticationService.userRole;
    // if the user is already logged in, take him to the home page
    if (AuthenticationService.isLogged && $location.path() == '/login') {
      $location.path('/');
    }
  });

};

run.$inject = ['$rootScope', '$window', '$location', 'AuthenticationService'];

export default run;