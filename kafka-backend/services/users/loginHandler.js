// const loginHandler = async (msg, callback) => {
//     const res = {};

// }
const { findUserForLogin } = require('../../db/controllers/userController');

const loginHandler = async (msg, callback) => {
  const res = {};
  console.log('inside login handler');
  const findUserObject = await findUserForLogin(msg.email, msg.password);
  //   console.log('find user object', findUserObject);
  res.status = findUserObject.statusCode;
  res.data = findUserObject.body;
  callback(null, res);
};

module.exports = loginHandler;
