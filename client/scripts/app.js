import angular from 'angular';
import _ from 'lodash';
import uibs from 'angular-ui-bootstrap';
import ngAnimate from 'angular-animate';
import ngMessages from 'angular-messages';
import Constants from './constants';
import CollectionController from './controllers/CollectionController';
import PersonalFormController from './controllers/FormController';
import SubmitController from './controllers/SubmitController';
import IntroController from './controllers/IntroController';
import ThankYouController from './controllers/ThankYouController';
import ApplicationController from './controllers/ApplicationController';
import HeaderController from './controllers/HeaderController';
import CollectionService from './services/CollectionService';
import WrapService from './services/WrapService';
import CustomerRepService from './services/CustomerRepService';
import SubmissionService from './services/SubmissionService';
import NotificationService from './services/NotificationService';
import InactiveService from './services/InactiveService';
import LoadingService from './services/LoadingService';
import TelFilter from './filters/TelFilter';
import PhoneInputDirective from './directives/PhoneInputDirective';
import FormInitDirective from './directives/FormInitDirective';
import RequireIfTrueDirective from './directives/RequireIfTrueDirective';
import Utils from './utils.js';


angular.module(Constants.moduleName || "guidedSelling", [uibs, ngAnimate, ngMessages])
  .run(() => {
    Utils.resize();
  })
  .controller('CollectionController', CollectionController)
  .controller('PersonalFormController', PersonalFormController)
  .controller('SubmitController', SubmitController)
  .controller('IntroController', IntroController)
  .controller('HeaderController', HeaderController)
  .controller('ThankYouController', ThankYouController)
  .controller('ApplicationController', ApplicationController)
  .filter('tel', () => TelFilter.filterFactory)
  .service('CollectionService', CollectionService)
  .service('WrapService', WrapService)
  .service('CustomerRepService', CustomerRepService)
  .service('SubmissionService', SubmissionService)
  .service('NotificationService', NotificationService)
  .service('InactiveService', InactiveService)
  .service('LoadingService', LoadingService)
  .directive('phoneInput', PhoneInputDirective.directiveFactory)
  .directive('requireIf', RequireIfTrueDirective.directiveFactory)
  // .directive('formInit', FormInitDirective.directiveFactory);
