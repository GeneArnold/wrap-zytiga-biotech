import Constants from '../constants';
import AngularBaseClass from '../angularBaseClass';

class UserAuthService extends AngularBaseClass {
  constructor($location, $http, AuthenticationService) {
    super(arguments);
  }

  login(email, password) {
    return this.$http.post(Constants.WRAP_APP_URL + '/login', {
      email: email,
      password: password
    });
  }

  logout() {
    if (this.AuthenticationService.isLogged) {
      this.AuthenticationService.clear();
      console.log('fsdf');
      this.$location.path('/login');
    }
  }

  check() {
    this.$http
      .get(Constants.WRAP_APP_URL + '/user_status')
      .success(data => {
        this.AuthenticationService.check();
      })
      .error((status) => {
        this.AuthenticationService.clear();
      });
  }
}

UserAuthService.$inject = ['$location',
                           '$http',
                           'AuthenticationService'];
export default UserAuthService;
