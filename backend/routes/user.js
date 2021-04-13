const express = require('express');
const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');
const { auth, checkAuth } = require('../auth/passport');

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

auth();

router.post('/login', async (req, res) => {
  req.body.path = 'user-login';
  try {
    kafka.make_request('users', req.body, (err, results) => {
      if (err) {
        res.status(500).send('System Error, Try Again.');
      } else {
        const msg = results.data;
        delete msg.password;
        if (results.status === 200) {
          const token = jwt.sign({
            // eslint-disable-next-line no-underscore-dangle
            id: results.data._id,
          },
          process.env.SECRET,
          {
            expiresIn: 1008000,
          });
          const jwtToken = `JWT ${token}`;
          msg.token = jwtToken;
          res.status(201).send(msg);
        } else {
          res.status(results.status).send(msg);
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/registered', checkAuth, async (req, res) => {
  req.body.path = 'get-registered-users';
  try {
    kafka.make_request('users', req.body, (err, results) => {
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

router.get('/test', checkAuth, (req, res) => {
  res.status(200).send(req.body);
  // try {
  //   kafka.make_request('users', req.body, (err, results) => {
  //     if (err) {
  //       res.status(500).send('System Error, Try again.');
  //     } else {
  //       const msg = results.data;
  //       res.status(results.status).send(msg);
  //     }
  //   });
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send(err);
  // }
});

module.exports = router;
