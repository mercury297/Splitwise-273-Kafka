const { updateUserByID } = require('../../db/controllers/userController');

const profilePictureHandler = async (msg, callback) => {
  const res = {};
  const updateUserObject = await updateUserByID(msg.userID, { photoURL: msg.photoURL });
  res.status = updateUserObject.statusCode;
  res.data = updateUserObject.body;
  callback(null, res);
};

module.exports = profilePictureHandler;
