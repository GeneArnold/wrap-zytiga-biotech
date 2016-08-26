import angular from 'angular';
import AngularBaseClass from '../angularBaseClass';
import Constants from '../constants';

class ApplicationController extends AngularBaseClass {
  constructor() {
    super(arguments);

    this.loadConstants();
  }

  loadConstants() {
    angular.extend(this, {
      mainHeader: Constants.mainHeader,
      sendButtonText: Constants.sendButtonText,
      mainSubheader: Constants.mainSubheader
    })
  }
}

ApplicationController.$inject = [];
export default ApplicationController;