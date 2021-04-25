/* eslint-disable no-else-return */
const Group = require('../models/GroupModel');
const { getIndexOfUser } = require('../../utils/arrayUtils');

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

const addAcceptedInvite = async (groupName, email, name) => {
  try {
    const updateObject = await Group.findOneAndUpdate(
      { name: groupName },
      {
        $push: {
          users: { email, name },
        },
      },
    );
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
    console.log('add user to group after invite accept err:', err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getGroupUsers = async (name) => {
  try {
    const usersObject = await Group.findOne({ name }).select({ users: 1 });
    if (usersObject) {
      return {
        statusCode: 200,
        body: usersObject,
      };
    } else {
      return {
        statusCode: 500,
        body: 'Can not find users for group',
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const deleteUserFromGroup = async (groupName, email) => {
  try {
    const groupObject = await Group.findOne({ name: groupName });
    console.log(groupObject);
    const index = getIndexOfUser(groupObject.users, email);
    groupObject.users.splice(index, 1);
    const updateRes = await groupObject.save();
    if (updateRes) {
      return {
        statusCode: 200,
        body: updateRes,
      };
    } else {
      return {
        statusCode: 500,
        body: 'Can not delete group from User. Check DB or query',
      };
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

module.exports = {
  createGroup,
  updateGroupByID,
  addAcceptedInvite,
  getGroupUsers,
  deleteUserFromGroup,
};
