var services = require('../services');
var checkit  = require('checkit');
var bcrypt   = require('bcrypt');
var Promise  = require('bluebird');
var _        = require('lodash');

var User = services.bookshelf.Model.extend({
  tableName: 'users',
  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave);
    this.on('saving', this.assertEmailUnique);
    this.on('saving', this.hashPassword, this);
  },
  hasTimestamps: true,
  validations: {
    email: ['required', 'email'],
    // username: 'required'
  },
  validateSave: function() {
    return new checkit(this.validations).run(this.attributes);
  },
  getCleanData: function() {
    var data = _.clone(this.attributes);
    delete data['password_token'];

    return data;
  },
  assertEmailUnique: function(model, attributes, options) {
    return new Promise(function(resolve, reject) {
      if (model.hasChanged('email')) {
        return User
          .query('where', 'email', model.get('email'))
          .fetch()
          .then(function(existing) {
            if (existing) {
              reject({
                message: 'Email already exists'
              });
            } else {
              resolve();
            }
          });
      } else {
        resolve();
      }
    });
  },
  hashPassword: function(model, attrs, options) {
    return new Promise(function(resolve, reject) {
      if (model.isNew() && attrs.password === undefined) {
        reject({
          message: 'Missing password'
        });
      } else {
        if (model.hasChanged('password')) {
          bcrypt.genSalt(10, function(err, salt) {
            if (err) reject(err);

            bcrypt.hash(model.attributes.password, salt, function(err, hash) {
              if (err) reject(err);
              model.set('password_digest', hash);
              model.unset('password');

              resolve(hash); // data is created only after this ocurrs
            });
          });
        } else {
          resolve();
        }
      }
    });
  },
  verifyPassword: function(password, cb) {
    bcrypt.compare(password, this.attributes.password_digest, function(err, isMatch) {
      if (err) return cb(err);

      cb(null, isMatch);
    });
  }
});

module.exports = User;
