import angular from 'angular';
import Constants from '../constants';
import AngularBaseClass from '../angularBaseClass';

class CustomerRepService extends AngularBaseClass {
  constructor(WrapService) {
    super(arguments);
    this.repData = {};
  }

  getCustomerRepInfo() {
    angular.extend(this.repData, Constants.repData);
    
    return this.repData;
  }
}

CustomerRepService.$inject = [];
export default CustomerRepService;