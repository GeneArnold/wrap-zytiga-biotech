import angular from 'angular';
import _ from 'lodash';
import uibs from 'angular-ui-bootstrap';
import ngRoute from 'angular-route';
import ngAnimate from 'angular-animate';
import ngMessages from 'angular-messages';
import 'ngStorage';
import Constants from './constants';
import CollectionController from './controllers/CollectionController';
import PersonalFormController from './controllers/FormController';
import SubmitController from './controllers/SubmitController';
import IntroController from './controllers/IntroController';
import LoginController from './controllers/LoginController';
import ThankYouController from './controllers/ThankYouController';
import ApplicationController from './controllers/ApplicationController';
import HeaderController from './controllers/HeaderController';
import CollectionService from './services/CollectionService';
import WrapService from './services/WrapService';
import CustomerRepService from './services/CustomerRepService';
import SubmissionService from './services/SubmissionService';
import NotificationService from './services/NotificationService';
import InactiveService from './services/InactiveService';
import AuthenticationService from './services/AuthenticationService';
import UserAuthService from './services/UserAuthService';
import LoadingService from './services/LoadingService';
import TelFilter from './filters/TelFilter';
import PhoneInputDirective from './directives/PhoneInputDirective';
import FormInitDirective from './directives/FormInitDirective';
import RequireIfTrueDirective from './directives/RequireIfTrueDirective';
import Utils from './utils.js';
import TokenInterceptor from './factories/TokenInterceptor';
import configuration from './configuration';
import initialRun from './initialRun';

angular.module(Constants.moduleName || "guidedSelling", [uibs, ngRoute, ngAnimate, ngMessages, 'ngStorage', 'partials'])
  .run(initialRun)
  .config(configuration)
  .controller('CollectionController', CollectionController)
  .controller('PersonalFormController', PersonalFormController)
  .controller('SubmitController', SubmitController)
  .controller('IntroController', IntroController)
  .controller('LoginController', LoginController)
  .controller('HeaderController', HeaderController)
  .controller('ThankYouController', ThankYouController)
  .controller('ApplicationController', ApplicationController)
  .filter('tel', () => TelFilter.filterFactory)
  .service('CollectionService', CollectionService)
  .service('WrapService', WrapService)
  .service('CustomerRepService', CustomerRepService)
  .service('AuthenticationService', AuthenticationService)
  .service('UserAuthService', UserAuthService)
  .service('SubmissionService', SubmissionService)
  .service('NotificationService', NotificationService)
  .service('InactiveService', InactiveService)
  .service('LoadingService', LoadingService)
  .factory('TokenInterceptor', TokenInterceptor.tokenInterceptorFactory)
  .directive('phoneInput', PhoneInputDirective.directiveFactory)
  .directive('requireIf', RequireIfTrueDirective.directiveFactory)

  // .directive('formInit', FormInitDirective.directiveFactory);
