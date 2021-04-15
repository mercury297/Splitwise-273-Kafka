const Expense = require('../models/ExpenseModel');

const createExpense = async (date, description, paidEmail, paidName, amount, groupName) => {
  try {
    const expenseObject = new Expense({
      date,
      description,
      paidEmail,
      paidName,
      amount,
      groupName,
    });
    const insertRes = await expenseObject.save();
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

module.exports = {
  createExpense,
};
