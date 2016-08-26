import AngularBaseClass from '../angularBaseClass';

class SubmitController extends AngularBaseClass {
  constructor($rootScope, $uibModal, WrapService, LoadingService) {
    super (arguments);
    this.shared = false;
  }

  canSendSMS() {
    return this.WrapService.canSendSMS();
  }

  canSendEmail() {
    return this.WrapService.canSendEmail();
  }

  shareWrapViaSMS() {
    this.WrapService.setFormDirty();
    if (this.canSendSMS()) {
      this.LoadingService.loading();
      this.WrapService.createPersonalizedWrap()
      .then(wrap => {
        this.WrapService.shareWrapViaSMS(wrap)
        .then(message => {
          this.shared = true;
          this.WrapService.sendEntry();
          this.LoadingService.loaded();
          this.$rootScope.showThankYouScreen = true;
          this.WrapService.clearForm();
        })
        .catch(error => {
          this.LoadingService.loaded();
          this.sendErrorMessage('Send SMS', "There was problem sending the wrap", false);
        });
      });
    } else {
      this.sendErrorForSMS();
    }
  };

  shareWrapViaEmail() {
    if (this.canSendEmail()) {
      this.WrapService.createPersonalizedWrap()
      .then(wrap => {
        this.WrapService.shareWrapViaEmail(wrap.id)
        .then(message => {
          this.shared = true;
          this.WrapService.clearForm();
          this.WrapService.sendEntry();
          this.sendErrorMessage('Send Email', message);
        });
      });
    } else {
      this.WrapService.setFormDirty();
      this.sendErrorForEmail();
    }
  }

  sendErrorForSMS() {
    this.sendErrorMessage.apply(this, this.WrapService.errorForSMS());
  }

  sendErrorForEmail() {
    this.sendErrorMessage.apply(this, this.WrapService.errorForEmail());
  }

  sendErrorMessage(title, message, showIntro = false) {
    const data = {
      boldTextTitle: title,
      textAlert: message,
      mode: 'alert'
    }
    const self = this;
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    const modalInstance = this.$uibModal.open({
      templateUrl: 'errorModalTemplate.html',
      openedClass: 'formErrorMessage',
      backdrop: false,
      controller: ['$scope', '$uibModalInstance', 'data', ($scope, $uibModalInstance, data) => {
        $scope.data = data;
        $scope.close = function() {
          $uibModalInstance.close($scope.data);

          if (showIntro) {
            self.$rootScope.showIntroScreen = true;
          }
        }
      }],
      backdrop: true,
      keyboard: true,
      backdropClick: true,
      size: 'lg',
      resolve: {
        data: function() {
          return data;
        }
      }
    });
  }
}

SubmitController.$inject = ['$rootScope', '$uibModal', 'WrapService', 'LoadingService'];
export default SubmitController;
