const { getMyGroups } = require('../../db/controllers/userController');

const getMyGroupsHandler = async (msg, callback) => {
  const res = {};
  const groupsObject = await getMyGroups(msg.email);
  res.status = groupsObject.statusCode;
  res.data = groupsObject.body;
  callback(null, res);
};

module.exports = getMyGroupsHandler;
