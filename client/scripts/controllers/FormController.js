import Constants from '../constants';
import AngularBaseClass from '../angularBaseClass';

class PersonalFormController extends AngularBaseClass {
  constructor($scope, WrapService) {
    super(arguments);

    this.formFields = Constants.formFields;

    $scope.$watch('personalInformation', form => {
      this.WrapService.updatePersonalForm(this.$scope);  
    });
  }

  updateForm() {
    this.WrapService.updatePersonalForm(this.$scope);
  };
}

PersonalFormController.$inject = ['$scope', 'WrapService'];
export default PersonalFormController;
