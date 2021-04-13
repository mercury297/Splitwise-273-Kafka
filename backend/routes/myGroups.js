const express = require('express');
const kafka = require('../kafka/client');
const { checkAuth } = require('../auth/passport');

const router = express.Router();

router.get('/:email/invites', checkAuth, async (req, res) => {
  req.body.path = 'get-invites';
  const msg = { path: 'get-invites', email: req.params.email };
  try {
    kafka.make_request('users', msg, (err, results) => {
      if (err) {
        res.status(500).send('System Error, Try Again.');
      } else {
        console.log('inside successful result');
        res.status(results.status).send(results.data);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
