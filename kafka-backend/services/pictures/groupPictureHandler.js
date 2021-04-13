const { updateGroupByID } = require('../../db/controllers/groupController');

const groupPictureHandler = async (msg, callback) => {
  const res = {};
  console.log(msg);
  const updateUserObject = await updateGroupByID(msg.groupID, { photoURL: msg.photoURL });
  res.status = updateUserObject.statusCode;
  res.data = updateUserObject.body;
  callback(null, res);
};

module.exports = groupPictureHandler;
