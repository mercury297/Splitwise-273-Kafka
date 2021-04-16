const { createGroup } = require('../../db/controllers/groupController');
const { addToGroupOne } = require('../../db/controllers/userController');
const { createActivity } = require('../../db/controllers/activityController');

const createGroupHandler = async (msg, callback) => {
  const res = {};
  console.log('create group handler');
  const { groupName, email, userName } = msg;
  const createGroupObject = await createGroup(groupName, email, userName);
  const userUpdateObject = await addToGroupOne(email, groupName);
  console.log(createGroupObject, userUpdateObject);
  if (createGroupObject.statusCode === 201 && userUpdateObject.statusCode === 200) {
    const activityRes = await createActivity('CREATE_GROUP', userName, groupName, email);
    if (activityRes.statusCode === 201) {
      console.log('Activity for create group', activityRes.body);
    }
    res.status = 200;
    res.data = { user: userUpdateObject.body, group: createGroupObject.body };
  } else {
    res.status = 206;
    res.data = { msg: 'Unsuccesful or partial success. Debug please', user: userUpdateObject, group: createGroupObject };
  }
  callback(null, res);
};

module.exports = createGroupHandler;
