const { addToGroupMany } = require('../../db/controllers/userController');

const sendInvitesHandler = async (msg, callback) => {
  const res = {};
  console.log('send invites handler');
  const { emails, groupName } = msg;
  const usersUpdateObject = await addToGroupMany(emails, groupName);
  res.status = usersUpdateObject.statusCode;
  res.data = usersUpdateObject.body;
  callback(null, res);
};

module.exports = sendInvitesHandler;
