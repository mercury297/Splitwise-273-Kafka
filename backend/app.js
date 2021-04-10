/* eslint-disable consistent-return */
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/user', require('./routes/user'));

const port = process.env.PORT;
// || 3001;
app.listen(port, () => console.log(`listening on port ${port}`));
module.exports = app;
