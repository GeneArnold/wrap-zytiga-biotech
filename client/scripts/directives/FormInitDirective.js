import AngularBaseClass from '../angularBaseClass';

class FormInitDirective extends AngularBaseClass {
  constructor() {
    super(arguments);

    angular.extend(this, {
      restrict: 'A',
      scope: {
        init: '&formInit'
      }
    });
  }

  controller($scope, $element) {
    var name = null;
    if ($element[0] && $element[0].name) {
      name = $element[0].name;
    }


    var listener = $scope.$watch('init', () => {
      if ($scope[name] && $scope.init) {
        $scope.init();
        listener();
      }
    });
  }

  static directiveFactory() {
    FormInitDirective.instance = new FormInitDirective();

    return FormInitDirective.instance;
  }
}

FormInitDirective.$inject = FormInitDirective.directiveFactory.$inject = [];
export default FormInitDirective;