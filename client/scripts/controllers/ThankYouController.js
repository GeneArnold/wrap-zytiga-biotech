import AngularBaseClass from '../angularBaseClass';

class ThankYouController extends AngularBaseClass {
	constructor($rootScope) {
		super(arguments);
	}

  close() {
    this.$rootScope.showIntroScreen = true;
    this.$rootScope.showThankYouScreen = false;
  }
}

ThankYouController.$inject = ['$rootScope'];
export default ThankYouController;