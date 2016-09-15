import angular from 'angular';
import AngularBaseClass from '../angularBaseClass';
import Constants from '../constants';

class LoginController extends AngularBaseClass {
  constructor($scope, $location, UserAuthService, AuthenticationService) {
    super(arguments);
  }

  login() {
    const email = $scope.user.email;
    const password = $scope.user.password;

    UserAuthService
      .login(email, password)
      .success(data => {
        AuthenticationService.token = data.token;
        AuthenticationService.user = data.user;
        AuthenticationService.check();

        $location.path('/');
      })
      .error((status) => {
        // respond with error
      });
  }
}

LoginController.$inject = ['$scope',
                           '$location',
                           'UserAuthService',
                           'AuthenticationService'];
export default LoginController;