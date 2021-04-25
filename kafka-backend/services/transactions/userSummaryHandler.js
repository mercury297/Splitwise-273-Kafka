/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-console */
const {
  getTransactionSummary,
} = require('../../db/controllers/transactionController');

const userSummaryHandler = async (msg, callback) => {
  const res = {};
  const { email } = msg;
  const resGetTransactionSummary = await getTransactionSummary(email);
  console.log(resGetTransactionSummary);
  const transactionSummaryWhereUserPaid = [];
  const transactionSummaryWhereUserOwes = [];
  for (let i = 0; i < resGetTransactionSummary.body.length; i += 1) {
    console.log('resGetTransactionSummary', resGetTransactionSummary[i]);
    if (resGetTransactionSummary.body[i]._id.userThatPaidEmail === email) {
      transactionSummaryWhereUserPaid.push(resGetTransactionSummary.body[i]);
    } else if (resGetTransactionSummary.body[i]._id.userThatOwesEmail === email) {
      transactionSummaryWhereUserOwes.push(resGetTransactionSummary.body[i]);
    }
  }
  const txObject = {
    transactionSummaryWhereUserOwes, transactionSummaryWhereUserPaid,
  };
  // const object=getGroupByGroupName(resGetTransactionSummaryWhereUserPaid);
  console.log(txObject);
  res.status = resGetTransactionSummary.statusCode;
  res.data = txObject;
  callback(null, res);
};

module.exports = userSummaryHandler;
