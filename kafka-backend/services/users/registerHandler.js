const { createUser } = require('../../db/controllers/userController');

const registerHandler = async (msg, callback) => {
  const res = {};
  console.log('inside register handler', msg);
  const createUserObject = await createUser(msg.name, msg.email, msg.password);
  res.status = createUserObject.statusCode;
  res.data = createUserObject.body;
  callback(null, res);
};

module.exports = registerHandler;
