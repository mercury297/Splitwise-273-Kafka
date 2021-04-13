/* eslint-disable no-console */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

const createUser = async (name, email, password) => {
  console.log('inside controller');
  try {
    const userObject = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    const insertRes = await userObject.save();
    console.log('insert res :', insertRes);
    return {
      statusCode: 201,
      body: userObject,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const findUserForLogin = async (email, password) => {
  try {
    const userObject = await User.findOne({ email });
    console.log('user from email', userObject);
    if ('email' in userObject && userObject.email === email) {
      // console.log('hash sync', bcrypt.hashSync(password, 10));
      const match = await bcrypt.compare(password, userObject.password);
      if (match) {
        return {
          statusCode: 200,
          body: userObject,
        };
      } else {
        return {
          statusCode: 403,
          body: 'Incorrect password',
        };
      }
    } else {
      return {
        statusCode: 400,
        body: 'User does not exist',
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

const findUserById = async (ID) => {
  try {
    const userObject = await User.findById(ID);
    if (!userObject) {
      return {
        statusCode: 404,
        body: 'Invalid token',
      };
    } else {
      return {
        statusCode: 200,
        body: userObject,
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const updateUser = async (email, updates) => {
  try {
    const updateObject = await User.findOneAndUpdate({ email }, updates, {
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

const updateUserByID = async (userID, updates) => {
  try {
    console.log('inside controller', userID);
    const updateObject = await User.findByIdAndUpdate(userID, updates, {
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

const addToGroupOne = async (email, groupName) => {
  try {
    const updateObject = await User.findOneAndUpdate({ email },
      {
        $push:
        { groups: { groupName, inviteAccepted: true } },
      }, {
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
    console.log('add user to group err:', err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const addToGroupMany = async (emails, groupName) => {
  try {
    const updateObject = await User.updateMany({
      email: { $in: emails },
    },
    {
      $push:
      { groups: { groupName, inviteAccepted: false } },
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
    console.log('add many users to group err:', err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

module.exports = {
  createUser,
  findUserForLogin,
  findUserById,
  updateUser,
  updateUserByID,
  addToGroupOne,
  addToGroupMany,
};
