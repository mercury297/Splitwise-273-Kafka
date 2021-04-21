/* eslint-disable consistent-return */
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const session = require('express-session');

dotenv.config();

app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(cors());

app.use(session({
  secret: 'cmpe273_kafka_passport_mongo',
  resave: false,
  saveUninitialized: false,
  duration: 60 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

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
app.use('/profile', require('./routes/profile'));
app.use('/picture', require('./routes/picture'));
app.use('/group-management', require('./routes/createGroup'));
app.use('/group-management/groups', require('./routes/myGroups'));
app.use('/group-management/group', require('./routes/group'));
app.use('/activities', require('./routes/recentActivity'));
app.use('/dashboard', require('./routes/dashboard'));

const port = process.env.PORT;
// || 3001;
app.listen(port, () => console.log(`listening on port ${port}`));
module.exports = app;
