const express = require('express');
const { checkAuth } = require('../auth/passport');
const kafka = require('../kafka/client');

const router = express.Router();

router.post('/:groupName/expense/add', checkAuth, async (req, res) => {
  req.body.path = 'add-expense';
  req.body.groupName = req.params.groupName;
  console.log(req.body);
  try {
    kafka.make_request('expenses', req.body, (err, results) => {
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
