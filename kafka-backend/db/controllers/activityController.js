const Activity = require('../models/ActivityModel');

const createActivity = async (operationType, name, groupName, email) => {
  try {
    const activityObject = new Activity({
      operationType,
      name,
      email,
      groupName,
    });
    const insertRes = await activityObject.save();
    if (insertRes) {
      return {
        statusCode: 201,
        body: insertRes,
      };
    }
    return {
      statusCode: 500,
      body: insertRes,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getRecentActivity = async (email) => {
  try {
    const activityObj = await Activity.find({ email }, null, { sort: { _id: -1 } });
    if (activityObj) {
      return {
        statusCode: 200,
        body: activityObj,
      };
    }
    return {
      statusCode: 500,
      body: activityObj,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

module.exports = {
  createActivity,
  getRecentActivity,
};
