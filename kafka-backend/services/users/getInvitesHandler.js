const { getInvites } = require('../../db/controllers/userController');

const getInvitesHandler = async (msg, callback) => {
  const res = {};
  const inviteObject = await getInvites(msg.email);
  res.status = inviteObject.statusCode;
  res.data = inviteObject.body;
  callback(null, res);
};

module.exports = getInvitesHandler;
