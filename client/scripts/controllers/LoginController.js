import angular from 'angular';
import AngularBaseClass from '../angularBaseClass';
import Constants from '../constants';

class LoginController extends AngularBaseClass {
  constructor($scope, $location, UserAuthService, AuthenticationService) {
    super(arguments);
  }

  login() {
    const email = this.$scope.user.email;
    const password = this.$scope.user.password;

    this.UserAuthService
      .login(email, password)
      .success(data => {
        this.AuthenticationService.token = data.token;
        this.AuthenticationService.user = data.user;
        this.AuthenticationService.check();

        this.$location.path('/');
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