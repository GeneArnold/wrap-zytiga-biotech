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
        submission = submission.attributes.data;
        return {
          id: submission.id,
          full_name: submission.full_name,
          phone_number: submission.phone_number,
          company: submission.company,
          email: submission.email,
          industry: submission.industry,
          topics: submission.topics,
          notes: submission.notes,
          created_at: `${submission.attributes.created_at}`
        };
      });

      res.csv(data, 'Customer list.csv');
    })
    .catch(handleError(res));
});

module.exports = router;
