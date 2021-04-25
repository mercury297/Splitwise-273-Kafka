/* eslint-disable no-console */
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
// find({ userThatPaidEmail: email },{ settledFlag: false })
const getTransactionSummary = async (email) => {
  console.log(email);
  try {
    const txObject = await Transaction.aggregate([
      { $match: { settledFlag: false } },
      {
        $group: {
          _id: {
            groupName: '$groupName',
            userThatPaidEmail: '$userThatPaidEmail',
            userThatOwesEmail: '$userThatOwesEmail',
          },
          total: {
            $sum: '$amountOwed',
          },
        },
      }]);
    console.log('inside trans summary', txObject);
    if (txObject) {
      return {
        statusCode: 200,
        body: txObject,
      };
    }
    return {
      statusCode: 500,
      body: 'get summary error',
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getDuesForGroup = async (email, groupName) => {
  try {
    console.log('inside dues controller');
    const txObject = await Transaction.find(
      { $or: [{ userThatPaidEmail: email }, { userThatOwesEmail: email }] },
      { groupName },
      { settledFlag: false },
    );
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

const settleUpDues = async (currentUser, settleUpUser) => {
  try {
    console.log('inside controller settle up');
    const txObject = await Transaction.updateMany(
      {
        $or: [
          {
            $and:
        [{ userThatPaidEmail: currentUser }, { userThatOwesEmail: settleUpUser }],
          },
          { $and: [{ userThatPaidEmail: settleUpUser }, { userThatOwesEmail: currentUser }] }],
        settledFlag: false,
      },
      {
        settledFlag: true,
      },
    );
    // console.log(txObject);
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
  getTransactionSummary,
  getDuesForGroup,
  settleUpDues,
};
