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
      var data = submissions.map((submission) => {
        return _.extend({
          id: submission.id,
          created_at: submission.attributes.created_at
        }, submission.attributes.data);
      });

      res.json(data);
    })
    .catch(handleError(res));
});

router.post('/', (req, res, done) => {
  Submission.forge({
    data: req.body
  }).save()
    .then(submisssion => {
      res.json(submisssion)
    })
    .catch(handleError(res));
});

router.get('/csv', (req, res, done) => {
  Submission.fetchAll()
    .then(submissions => {
      var data = submissions.map((submission) => {
        return _.extend({
          id: submission.id,
          created_at: `${submission.attributes.created_at}`
        }, submission.attributes.data);
      });

      res.csv(data, 'Customer list.csv');
    })
    .catch(handleError(res));
});

module.exports = router;
