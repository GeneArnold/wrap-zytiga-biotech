var passport = require('passport');
var User     = require('../models').User;
var _        = require('lodash');
var jwt      = require('jwt-simple');

var setup = function(app) {
  app.use(passport.initialize());
};

var moduleObject = {
  setup: setup
};


module.exports = moduleObject