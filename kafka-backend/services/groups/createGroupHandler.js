const { createGroup } = require('../../db/controllers/groupController');
const { addToGroupOne } = require('../../db/controllers/userController');

const createGroupHandler = async (msg, callback) => {
  const res = {};
  console.log('create group handler');
  const { groupName, email, userName } = msg;
  const createGroupObject = await createGroup(groupName, email, userName);
  const userUpdateObject = await addToGroupOne(email, groupName);
  console.log(createGroupObject, userUpdateObject);
  if (createGroupObject.statusCode === 201 && userUpdateObject.statusCode === 200) {
    res.status = 200;
    res.data = { user: userUpdateObject, group: createGroupObject };
  } else {
    res.status = 206;
    res.data = { msg: 'Unsuccesful or partial success. Debug please', user: userUpdateObject, group: createGroupObject };
  }
  callback(null, res);
};

module.exports = createGroupHandler;
