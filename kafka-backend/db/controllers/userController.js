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

module.exports = createUser;
