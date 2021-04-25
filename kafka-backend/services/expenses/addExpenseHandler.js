/* eslint-disable no-underscore-dangle */
const { createExpense } = require('../../db/controllers/expenseController');
const { getGroupUsers } = require('../../db/controllers/groupController');
const { createTransactionMany } = require('../../db/controllers/transactionController');
const { getOwesList, createTxArray } = require('../../utils/arrayUtils');
const { createActivity } = require('../../db/controllers/activityController');

const addExpenseHandler = async (msg, callback) => {
  const res = {};
  // const { date, description, paidEmail, paidName, amount, groupName } = msg;
  console.log('add expense handler msg: ', msg);
  const createExpenseObj = await createExpense(msg.description,
    msg.paidEmail, msg.paidName, msg.amount, msg.groupName);
  if (createExpenseObj.statusCode === 201) {
    const activityRes = await createActivity('ADD_EXPENSE', msg.paidName, msg.groupName, msg.paidEmail);
    if (activityRes.statusCode === 201) {
      console.log('acitivty for expense add: ', activityRes.body);
    }
    const usersObject = await getGroupUsers(msg.groupName);
    if (usersObject.statusCode === 200) {
      const owesList = await getOwesList(usersObject.body.users);
      const userThatPaid = { name: msg.paidName, email: msg.paidEmail };
      const txArray = createTxArray(userThatPaid, owesList,
        // eslint-disable-next-line no-underscore-dangle
        msg.amount, msg.groupName, createExpenseObj.body._id);
      // res.status = 200;
      // res.data = txArray;
      console.log('txArray before insertMany in handler: ', txArray);
      const txObject = await createTransactionMany(txArray);
      res.status = txObject.statusCode;
      res.data = txObject.body;
    } else {
      res.status = usersObject.statusCode;
      res.data = usersObject.body;
    }
  } else {
    res.status = createExpenseObj.statusCode;
    res.data = createExpenseObj.body;
  }
  callback(null, res);
};

module.exports = addExpenseHandler;
