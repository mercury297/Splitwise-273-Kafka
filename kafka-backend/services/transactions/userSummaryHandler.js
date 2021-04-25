const { getTransactionSummary } = require('../../db/controllers/transactionController');

const userSummaryHandler = async (msg, callback) => {
  const res = {};
  const { email } = msg;
  console.log('inside summary handler', msg);
  const txObject = await getTransactionSummary(email);
  res.status = txObject.statusCode;
  res.data = txObject.body;
  callback(null, res);
};

module.exports = userSummaryHandler;
