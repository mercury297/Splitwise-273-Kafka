/* eslint-disable no-console */
const express = require('express');
const { checkAuth } = require('../auth/passport');
const kafka = require('../kafka/client');

const router = express.Router();

router.get('/:email', checkAuth, async (req, res) => {
  const msg = { path: 'user-summary', email: req.params.email };
  console.log('route has begun');
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

// settle-up
router.post('/settle-up', checkAuth, async (req, res) => {
  try {
    req.body.path = 'settle-up';
    kafka.make_request('transactions', req.body, (err, results) => {
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
