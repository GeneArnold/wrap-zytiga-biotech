var config = require('config');
var User   = require('../models').User;

var signup = function(req, res, done) {
  User.forge(req.body)
    .save()
    .then(u => {
      res.json({
        success: true,
        user: u.getCleanData()
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
            var secret = config.get('secret');
            var token = jwt.encode({
              id: user.id
            }, secret);

            res.json({
              success: true,
              token: token
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
      res.status(401).json({
        success: false,
        message: e.message
      })
    })
};

module.exports = {
  signup: signup
};