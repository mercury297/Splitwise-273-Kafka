const Transaction = require('../models/TransactionModel');

const createTransactionOne = async (userThatPaidEmail,
  userThatPaidName, userThatOwesEmail, userThatOwesName, amountOwed, groupName) => {
  try {
    const txObject = new Transaction({
      userThatPaidEmail,
      userThatPaidName,
      userThatOwesEmail,
      userThatOwesName,
      amountOwed,
      groupName,
    });
    const insertRes = await txObject.save();
    return {
      statusCode: 201,
      body: insertRes,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const createTransactionMany = async (txArray) => {
  try {
    const txObject = await Transaction.insertMany(txArray);
    if (txObject) {
      return {
        statusCode: 200,
        body: txObject,
      };
    }
    return {
      statusCode: 500,
      body: 'Update error',
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

module.exports = {
  createTransactionOne,
  createTransactionMany,
};
