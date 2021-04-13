const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const { getParams, s3 } = require('../services/s3Uploader');
const kafka = require('../kafka/client');
const { checkAuth } = require('../auth/passport');

const router = express.Router();

router.put('/profile/:userID', checkAuth, upload.single('file'), async (req, res) => {
  try {
    const { file } = req;
    const params = getParams(req.params.userID, file.buffer, file.mimetype);
    s3.upload(params, async (err, data) => {
      if (err) {
        res.status(500).send({
          errors: err,
        });
      } else {
        const msg = { userID: req.params.userID, path: 'user-profile-picture', photoURL: data.Location };
        kafka.make_request('pictures', msg, (error, results) => {
          if (error) {
            res.status(500).send('System Error, Try Again.');
          } else {
            res.status(results.status).send(results.data);
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send('Missing file or userID param. Bad Request');
  }
});

router.put('/group/:groupID', checkAuth, upload.single('file'), async (req, res) => {
  try {
    const { file } = req;
    const params = getParams(req.params.groupID, file.buffer, file.mimetype);
    s3.upload(params, async (err, data) => {
      if (err) {
        res.status(500).send({
          errors: err,
        });
      } else {
        const msg = { groupID: req.params.groupID, path: 'group-picture', photoURL: data.Location };
        kafka.make_request('pictures', msg, (error, results) => {
          if (error) {
            res.status(500).send('System Error, Try Again.');
          } else {
            res.status(results.status).send(results.data);
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send('Missing file or userID param. Bad Request');
  }
});

module.exports = router;
