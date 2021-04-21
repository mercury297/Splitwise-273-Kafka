const express = require('express');
const { checkAuth } = require('../auth/passport');
const kafka = require('../kafka/client');

const router = express.Router();

router.get('/:email', checkAuth, async (req, res) => {
  const msg = { path: 'get-user-summary', email: req.params.email };
  try {
    kafka.make_request('transactions', msg, (err, results) => {
      if (err) {
        res.status(500).send('System Error, Try Again.');
      } else {
        res.status(results.status).send(results.data);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
