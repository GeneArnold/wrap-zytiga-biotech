import Constants from '../constants';
import AngularBaseClass from '../angularBaseClass';

class AuthenticationService extends AngularBaseClass {
  constructor($sessionStorage, $location) {
    super(arguments);

    this.isLogged = false;
  }

  check() {
    if (this.$sessionStorage.token && this.$sessionStorage.user) {
      this.isLogged = true;
    } else {
      this.clear();
    }

    return this.isLogged;
  }

  clear() {
    this.isLogged = false;
    this.$sessionStorage.$reset();
    this.$location.path('/login');
  }

  set user(value) {
    this.$sessionStorage.user = value;
  }

  get user() {
    return this.$sessionStorage.user;
  }

  set token(value) {
    this.$sessionStorage.token = value;
  }

  get token() {
    return this.$sessionStorage.token;
  }

  get userRole() {
    return this.$sessionStorage.userRole;
  }
}

AuthenticationService.$inject = ['$sessionStorage', '$location'];
export default AuthenticationService;
