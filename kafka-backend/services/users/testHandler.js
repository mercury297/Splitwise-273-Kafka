const { findUserById } = require('../../db/controllers/userController');

const testHandler = async (msg, callback) => {
  const res = {};
  try {
    const userExistObject = await findUserById(msg.userID);
    res.status = userExistObject.statusCode;
    res.data = userExistObject.body;
    callback(null, res);
  } catch (err) {
    res.status = 404;
    res.body = err;
    callback(null, res);
  }
};

exports.testHandler = testHandler;
