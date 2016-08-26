import AngularBaseClass from '../angularBaseClass';

class HeaderController extends AngularBaseClass {
  constructor($rootScope, WrapService) {
    super(arguments);
  }

  resetForm() {
    this.WrapService.clearForm();
    this.$rootScope.$broadcast('inactive.state');
  }
}

HeaderController.$inject = ['$rootScope', 'WrapService'];

export default HeaderController;

