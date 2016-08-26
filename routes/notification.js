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
      templateData: {
        full_name: req.body.full_name,
        cover_url: req.body.cover_url || ''
      }
    }, function(err, success) {
      if (err) {
        console.log(err);

        res.status(500).send(err);
      } else {
        console.log(success);
        res.send('Success');
      }
    });
  } else {
    res.status(500).send('Missing information');
  }
});

module.exports = router;
