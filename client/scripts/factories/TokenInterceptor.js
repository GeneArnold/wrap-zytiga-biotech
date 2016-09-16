import Constants from '../constants';
import AngularBaseClass from '../angularBaseClass';

const Interceptor = new WeakMap();

class TokenInterceptor extends AngularBaseClass {
  constructor($q, AuthenticationService) {
    super(arguments);
  }

  request(config) {
    const self = TokenInterceptor.instance;

    config.headers = config.headers || {};
    if (self.AuthenticationService.token) {
      config.headers['Authorization'] = self.AuthenticationService.token;
      config.headers['Content-Type'] = 'application/json';
    }
    return config || $q.when(config);
  }

  response(response) {
    return response || $q.when(response);
  }

  static tokenInterceptorFactory($q, AuthenticationService) {
    TokenInterceptor.instance = new TokenInterceptor($q, AuthenticationService);

    return TokenInterceptor.instance;
  }
}

TokenInterceptor.$inject = TokenInterceptor.tokenInterceptorFactory.$inject = ['$q', 'AuthenticationService'];

export default TokenInterceptor;