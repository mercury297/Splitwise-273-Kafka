const express = require('express');
const { checkAuth } = require('../auth/passport');
const kafka = require('../kafka/client');

const router = express.Router();

router.post('/:groupName/expense', checkAuth, async (req, res) => {
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

router.post('/expense/:expenseID/note', checkAuth, async (req, res) => {
  req.body.path = 'add-note';
  req.body.expenseID = req.params.expenseID;
  try {
    kafka.make_request('expenses', req.body, (err, results) => {
      if (err) {
        res.status(500).send('System Error, Try Again.');
      } else {
        res.status(results.status).send(results.data);
      }
    });
  } catch (err) {
    console.log('err in route', err);
    res.status(500).send(err);
  }
});

router.get('/:groupName/expenses', checkAuth, async (req, res) => {
  const msg = { path: 'get-expenses', groupName: req.params.groupName };
  try {
    kafka.make_request('expenses', msg, (err, results) => {
      if (err) {
        res.status(500).send('System Error, Try Again.');
      } else {
        res.status(results.status).send(results.data);
      }
    });
  } catch (err) {
    console.log('err in route', err);
    res.status(500).send(err);
  }
});

module.exports = router;
