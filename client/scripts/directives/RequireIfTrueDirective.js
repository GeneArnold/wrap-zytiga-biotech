import AngularBaseClass from '../angularBaseClass';

class RequireIfTrueDirective extends AngularBaseClass {
  constructor($compile) {
    super(arguments);

    this.require ='?ngModel';
    this.restrict = 'A';
  }

  link($scope, $element, $attrs, ngModel) {
    if (!ngModel) {
      return;
    }

    debugger
    if ($attrs.requireIf === "true") {
      $element.attr('required', true);
    } else {
      $element.removeAttr('required');
    }

    this.$compile($element.contents())($scope);
  }    

  static directiveFactory($compile) {
    RequireIfTrueDirective.instance = new RequireIfTrueDirective($compile);

    return RequireIfTrueDirective.instance;
  }
}

RequireIfTrueDirective.$inject = RequireIfTrueDirective.directiveFactory.$inject = ['$compile'];
export default RequireIfTrueDirective;


