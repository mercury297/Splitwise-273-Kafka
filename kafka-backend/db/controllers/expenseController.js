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

const addNote = async (note, name, email, expenseID) => {
  try {
    const noteObj = await Expense.findById(expenseID);
    noteObj.notes.push({ name, note, email });
    const noteUpdateRes = await noteObj.save();
    if (noteUpdateRes) {
      return {
        statusCode: 200,
        body: noteUpdateRes,
      };
    }
    return {
      statusCode: 500,
      body: noteUpdateRes,
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
  addNote,
};
