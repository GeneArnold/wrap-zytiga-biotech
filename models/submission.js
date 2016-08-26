var services = require('../services');
var checkit  = require('checkit');

var Submission = services.bookshelf.Model.extend({
  tableName: 'submissions',
  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave);
  },
  hasTimestamps: true,
  validateSave: function() {
    return new checkit({
    }).run(this.attributes);
  }
});

module.exports = Submission;
