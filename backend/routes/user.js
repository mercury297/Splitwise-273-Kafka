const express = require('express');
const kafka = require('../kafka/client');

const router = express.Router();

router.post('/register', async (req, res) => {
  req.body.path = 'user-register';
  console.log('route is working. Body is ', req.body);
  try {
    kafka.make_request('users', req.body, (err, results) => {
      if (err) {
        res.status(500).send('System Error, Try Again.');
      } else {
        let msg = results.data;
        console.log('inside successful result');
        console.log('res: ', results.data.name);
        if (results.status === 500) msg = 'Email already exists';
        res.status(results.status).send({
          data: msg,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/login', async (req, res) => {
  req.body.path = 'user-login';
  try {
    kafka.make_request('users', req.body, (err, results) => {
      if (err) {
        res.status(500).send('System Error, Try Again.');
      } else {
        const msg = results.data;
        res.status(results.status).send(msg);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
