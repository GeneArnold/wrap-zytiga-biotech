var express    = require('express');
var Submission = require('../models').Submission;
var router     = express.Router();
var _          = require('lodash');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

router.get('/', (req, res, done) => {
  Submission.fetchAll()
    .then(submissions => {
      res.json(submissions);
    })
    .catch(handleError(res));
});

router.post('/', (req, res, done) => {
  console.log(req.body);
  Submission.forge(req.body).save()
    .then(submisssion => {
      res.json(submisssion)
    })
    .catch(handleError(res));
});

module.exports = router;
