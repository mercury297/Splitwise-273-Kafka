const { findUserById } = require('../db/controllers/userController');

const passportHandler = async (msg, callback) => {
  const res = {};
  try {
    const { id } = msg;
    const user = await findUserById(id);
    res.status = user.statusCode;
    res.data = user.body;
    callback(null, res);
  } catch (e) {
    res.status = 500;
    res.body = e;
    callback(null, res);
  }
};

function handleRequest(msg, callback) {
  passportHandler(msg, callback);
}

exports.handleRequest = handleRequest;
