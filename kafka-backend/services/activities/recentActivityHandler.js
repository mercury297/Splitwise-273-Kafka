const { getRecentActivity } = require('../../db/controllers/activityController');

const recentActivityHandler = async (msg, callback) => {
  const res = {};
  const { email } = msg;
  const recentActivityObj = await getRecentActivity(email);
  res.status = recentActivityObj.statusCode;
  res.data = recentActivityObj.body;
  callback(null, res);
};

module.exports = recentActivityHandler;
