const { updateUser } = require('../../db/controllers/userController');

const updateHandler = async (msg, callback) => {
  const res = {};
  console.log('inside update handler', msg);
  const updateUserObject = await updateUser(msg.email, msg.updates);
  res.status = updateUserObject.statusCode;
  res.data = updateUserObject.body;
  callback(null, res);
};

module.exports = updateHandler;
