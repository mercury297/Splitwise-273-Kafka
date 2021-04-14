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

// body : email, name
router.post('/:groupName/invitation/accept', checkAuth, async (req, res) => {
  try {
    const msg = {
      groupName: req.params.groupName, email: req.body.email, name: req.body.name, path: 'accept-invite',
    };
    kafka.make_request('users', msg, (err, results) => {
      if (err) {
        res.status(500).send('System Error, Try Again.');
      } else {
        res.status(results.status).send(results.data);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:email', checkAuth, async (req, res) => {
  const msg = { path: 'get-my-groups', email: req.params.email };
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
