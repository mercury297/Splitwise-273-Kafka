const express = require('express');
const kafka = require('../kafka/client');
const { checkAuth } = require('../auth/passport');

const router = express.Router();

router.put('/:email/update', checkAuth, async (req, res) => {
//   req.body.path = 'update-profile';
  try {
    console.log(req.body);
    let msg = { email: req.params.email, updates: req.body, path: 'update-profile' };
    kafka.make_request('users', msg, (err, results) => {
      if (err) {
        res.status(500).send('System Error, Try Again.');
      } else {
        msg = results.data;
        res.status(results.status).send(msg);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// router.get('/:email', checkAuth, async (req, res) => {
//   try{

//   }
// });

module.exports = router;
