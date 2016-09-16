import angular from 'angular';
import AngularBaseClass from '../angularBaseClass';
import Constants from '../constants';
import Utils from '../utils.js';

class HomeController extends AngularBaseClass {
  constructor($scope) {
    super(arguments);

    Utils.resize();
  }
}

HomeController.$inject = ['$scope'];
export default HomeController;