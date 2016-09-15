import Constants from '../constants';
import AngularBaseClass from '../angularBaseClass';

class NotificationService extends AngularBaseClass {
  constructor($http) {
    super(arguments);
  }

  sendEntry(data, cb) {
    this.$http({
      method: 'POST',
      url: Constants.WRAP_APP_URL + '/notifications',
      data: data
    }).then(cb, error => {
      console.log(error);
    })
  }
}

NotificationService.$inject = ['$http'];

export default NotificationService;
