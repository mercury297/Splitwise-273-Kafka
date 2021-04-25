const { getDuesForGroup } = require('../../db/controllers/transactionController');
const { leaveGroupUser } = require('../../db/controllers/userController');
const { deleteUserFromGroup } = require('../../db/controllers/groupController');

const leaveGroupHandler = async (msg, callback) => {
  console.log('inside leave group handler');
  const res = {};
  const { email, groupName } = msg;
  console.log(msg);
  const duesObject = await getDuesForGroup(email, groupName);
  console.log('handler', duesObject.body.length);
  if (duesObject.body.length > 0) {
    const leaveGroupRes = await leaveGroupUser(email, groupName);
    const leaveUserRes = await deleteUserFromGroup(groupName, email);
    if (leaveUserRes.status === 200 && leaveUserRes.status === 200) {
      res.status = 200;
      res.data = { group: leaveUserRes.body, user: leaveGroupRes.body };
    } else {
      res.status = 500;
      res.data = { user: leaveUserRes.body, group: leaveGroupRes.body };
    }
  } else {
    res.status = 200;
    res.data = 'Group left!';
  }
  callback(null, res);
};

module.exports = leaveGroupHandler;
