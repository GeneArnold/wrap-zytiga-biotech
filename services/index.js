var config = require('config');
var activeFeatures = config.get('activeFeatures');

var bookshelf = require('./bookshelf');

var services = {
  bookshelf: bookshelf,
  knex: bookshelf.knex
};

if (activeFeatures.get('postmark')) {
  services['postmark'] = require('./postmark');
}

module.exports = services;