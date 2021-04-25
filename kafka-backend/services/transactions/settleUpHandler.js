const { settleUpDues } = require('../../db/controllers/transactionController');

const settleUpHandler = async (msg, callback) => {
  const res = {};
  const { currentUser, settleUpUser } = msg;
  console.log('inside settle up handler', msg);
  const txObject = await settleUpDues(currentUser, settleUpUser);
  res.status = txObject.statusCode;
  res.data = txObject.body;
  callback(null, res);
};

module.exports = settleUpHandler;
