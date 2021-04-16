const express = require('express');
const kafka = require('../kafka/client');
const { checkAuth } = require('../auth/passport');

const router = express.Router();

router.get('/:email', checkAuth, async (req, res) => {
  req.body.path = 'get-recent-activity';
  const msg = { path: 'get-recent-activity', email: req.params.email };
  try {
    kafka.make_request('activities', msg, (err, results) => {
      if (err) {
        res.status(500).send('System Error, Try Again.');
      } else {
        console.log('inside successful result');
        res.status(results.status).send(results.data);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
