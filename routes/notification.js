var express        = require('express');
var Submission     = require('../models').Submission;
var router         = express.Router();
var _              = require('lodash')
var Postmark       = require('../services').postmark;
var postmarkClient = new Postmark();

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

router.post('/', function(req, res, done) {
  var recipient = req.body.email;

  if (recipient) {
    postmarkClient.sendTemplate({
      recipient: recipient,
      templateData: req.body
    }, function(err, success) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send('Success');
      }
    });
  } else {
    res.status(500).send('Missing information');
  }
});

module.exports = router;
