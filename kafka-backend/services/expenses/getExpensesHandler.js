const { getAllExpenses } = require('../../db/controllers/expenseController');

const getExpensesHandler = async (msg, callback) => {
  const res = {};
  const {
    groupName,
  } = msg;
  const addNoteObj = await getAllExpenses(groupName);
  res.status = addNoteObj.statusCode;
  res.data = addNoteObj.body;
  callback(null, res);
};

module.exports = getExpensesHandler;
