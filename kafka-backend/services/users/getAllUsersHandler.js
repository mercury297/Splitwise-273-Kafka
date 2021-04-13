const { getAllUsers } = require('../../db/controllers/userController');

const getAllUsersHandler = async (msg, callback) => {
  const res = {};
  console.log(msg);
  const usersObject = await getAllUsers();
  res.status = usersObject.statusCode;
  res.data = usersObject.body;
  callback(null, res);
};

module.exports = getAllUsersHandler;
