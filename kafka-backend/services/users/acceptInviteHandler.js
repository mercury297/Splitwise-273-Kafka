const { addAcceptedInvite } = require('../../db/controllers/groupController');
const { acceptInvite } = require('../../db/controllers/userController');

const acceptInviteHandler = async (msg, callback) => {
  const res = {};
  const { email, groupName, name } = msg;
  const acceptInviteObj = await acceptInvite(email, groupName);
  if (acceptInviteObj.statusCode === 200) {
    const addToGroupObj = await addAcceptedInvite(groupName, email, name);
    if (addToGroupObj.statusCode === 200) {
      res.status = 200;
      res.data = { user: acceptInviteObj.body, group: addToGroupObj.body };
    } else {
      res.status = 206;
      res.data = { user: acceptInviteObj.body, group: addToGroupObj.body, msg: 'Could not add in groups db but invite accepted in user' };
    }
  } else {
    res.status = acceptInviteObj.statusCode;
    res.data = acceptInviteObj.body;
  }
  callback(null, res);
};

module.exports = acceptInviteHandler;
