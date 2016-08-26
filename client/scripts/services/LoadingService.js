import AngularBaseClass from '../angularBaseClass';

class LoadingService extends AngularBaseClass {
  constructor($rootScope) {
    super(arguments);
  }

  loading(message) {
    this.$rootScope.showLoadingMessage = true;
    this.$rootScope.loadingMessage = message;
  }

  loaded() {
    this.$rootScope.showLoadingMessage = false;
    this.$rootScope.loadingMessage = null;
  }
}

LoadingService.$inject = ['$rootScope'];
export default LoadingService;
