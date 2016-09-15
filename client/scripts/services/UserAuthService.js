import Constants from '../constants';
import AngularBaseClass from '../angularBaseClass';

class UserAuthService extends AngularBaseClass {
  constructor($location, $http, AuthenticationService) {
    super(arguments);
  }

  login(email, password) {
    return $http.post(Constants.WRAP_APP_URL + '/login', {
      email: email,
      password: password
    });
  }

  logout() {
    if (AuthenticationService.isLogged) {
      AuthenticationService.clear();

      $location.path('/login');
    }
  }
}

UserAuthService.$inject = ['$sessionStorage'];
export default UserAuthService;
