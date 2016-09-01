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

SubmissionService.$inject = ['$http'];

export default SubmissionService;
