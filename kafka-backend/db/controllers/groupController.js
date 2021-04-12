const Group = require('../models/GroupModel');

const createGroup = async (groupName, email, userName) => {
  try {
    const groupObject = new Group({
      name: groupName,
      users: [{
        email,
        name: userName,
      }],
    });
    const insertRes = await groupObject.save();
    console.log('group insert :', insertRes);
    return {
      statusCode: 201,
      body: groupObject,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

module.exports = {
  createGroup,
};
