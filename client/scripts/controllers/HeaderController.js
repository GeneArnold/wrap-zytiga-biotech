import AngularBaseClass from '../angularBaseClass';

class HeaderController extends AngularBaseClass {
  constructor($rootScope, WrapService, UserAuthService) {
    super(arguments);
  }

  resetForm() {
    this.WrapService.clearForm();
    this.$rootScope.$broadcast('inactive.state');
  }

  logout() {
    this.UserAuthService.logout();
  }
}

HeaderController.$inject = ['$rootScope',
                            'WrapService',
                            'UserAuthService'];

export default HeaderController;

