const express = require('express');
const kafka = require('../kafka/client');

const router = express.Router();

router.post('/register', async (req, res) => {
  req.body.path = 'user-login';
  console.log('route is working. Body is ', req.body);
  try {
    kafka.make_request('users', req.body, (err, results) => {
      if (err) {
        res.json({
          status: 'error',
          msg: 'System Error, Try Again.',
        });
      } else {
        console.log('inside successful result');
        res.json({
          data: results,
        });

        res.end();
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
