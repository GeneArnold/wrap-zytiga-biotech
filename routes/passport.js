var passport    = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt  = require('passport-jwt').ExtractJwt;
var User        = require('../models').User;
var _           = require('lodash');
var config      = require('config');
var authRoutes  = require('./authentication');

var setupLocal = function(passport) {
  var opts = {
    secretOrKey: config.get('secret'),
    jwtFromRequest: ExtractJwt.fromAuthHeader()
  };

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.forge({id: jwt_payload.id})
      .fetch()
      .then(function(user) {
        if (user) {
          done(null, user);
        } else {
          done(null, null);
        };
      })
      .catch(function(err) {
        done(err, null);
      });
  }));
};

var setupRoutes = function(app) {
  app.post('/signup', authRoutes.signup);
  app.post('/login', authRoutes.login);
  app.get('/status', passport.authenticate('jwt', {
    session: false
  }), authRoutes.status);
};

var setup = function(app) {
  app.use(passport.initialize());

  setupLocal(passport);
  setupRoutes(app, passport);
};

var moduleObject = {
  setup: setup,
  authentication: passport.authenticate('jwt', {
    session: false
  })
};

module.exports = moduleObject