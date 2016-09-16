var config = require('config');
var User   = require('../models').User;
var secret = config.get('secret');
var jwt    = require('jwt-simple');

var signup = function(req, res, done) {
  User.forge(req.body)
    .save()
    .then(user => {
      res.json({
        success: true,
        user: user.getCleanData()
      });
    })
    .catch(err => {
      res.status(500).json({
        sucess: false,
        message: err.message
      });
      done();
    });
};

var login = function(req, res, done) {
  User.where('email', req.body.email)
    .fetch()
    .then(user => {
      if (user) {
        user.verifyPassword(req.body.password, function(err, isMatch) {
          if (isMatch) {
            var token = jwt.encode({
              id: user.id
            }, secret);

            res.json({
              success: true,
              token: 'JWT ' + token,
              user: user.getCleanData()
            });
          } else{
            res.status(401).json({
              success: false,
              message: 'Authentication failed. Wrong password.'
            });
          }
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      }
    })
    .catch(e => {
      res.status(500).json({
        success: false,
        message: e.message
      })
    })
};

var extractToken = function(headers) {
  if (headers && headers.authorization) {
    parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

var status = function(req, res, done) {
  var user = req.user;

  res.json({
    success: true
  });
};

module.exports = {
  signup: signup,
  login: login,
  status: status
};