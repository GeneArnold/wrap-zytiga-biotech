var config = require('config');

var users = require('./user');
var submissions = require('./submission');
var notifications = require('./notification');
var aliveStatus = require('./status');

var activeFeatures = config.get('activeFeatures');

var setupRoutes = function(app) {
  app.use('/users', users);
  app.use('/submissions', submissions);
  app.use('/api/health', aliveStatus);

  if (activeFeatures.get('postmark')) {
    app.use('/notifications', notifications);
  }

  return app;
};

module.exports = setupRoutes;
