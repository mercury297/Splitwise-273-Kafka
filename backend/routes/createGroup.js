const express = require('express');
const kafka = require('../kafka/client');
const { checkAuth } = require('../auth/passport');

const router = express.Router();

router.post('/create', checkAuth, async (req, res) => {
  req.body.path = 'create-group';
  try {
    kafka.make_request('groups', req.body, (err, results) => {
      if (err) {
        res.status(500).send('System Error, Try Again.');
      } else {
        const msg = results.data;
        console.log('inside successful result');
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

// body : emails:['','']
router.post('/:groupName/invitations/send', checkAuth, async (req, res) => {
  try {
    let msg = { emails: req.body.emails, groupName: req.params.groupName, path: 'send-invites' };
    kafka.make_request('groups', msg, (err, results) => {
      if (err) {
        res.status(500).send('System Error, Try Again.');
      } else {
        msg = results.data;
        console.log('inside successful result');
        res.status(results.status).send({
          data: msg,
        });
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
