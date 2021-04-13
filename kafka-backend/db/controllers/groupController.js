/* eslint-disable no-else-return */
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

const updateGroupByID = async (groupID, updates) => {
  try {
    const updateObject = await Group.findByIdAndUpdate(groupID, updates, {
      new: true,
      useFindAndModify: true,
    });
    if (updateObject) {
      return {
        statusCode: 200,
        body: updateObject,
      };
    } else {
      return {
        statusCode: 500,
        body: 'Update error',
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

module.exports = {
  createGroup,
  updateGroupByID,
};
