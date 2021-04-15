const Transaction = require('../models/TransactionModel');

const createTransactionOne = async (userThatPaid, userThatOwes, amountOwed, groupName) => {
  try {
    const txObject = new Transaction({
      userThatPaid,
      userThatOwes,
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
