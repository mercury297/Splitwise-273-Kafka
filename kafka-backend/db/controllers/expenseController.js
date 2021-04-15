const Expense = require('../models/ExpenseModel');
const { getIndexOfNote } = require('../../utils/arrayUtils');

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

const getAllExpenses = async (groupName) => {
  console.log(groupName);
  try {
    const expensesObj = await Expense.find({ groupName });
    console.log('inside get all expense controller', expensesObj);
    if (expensesObj) {
      return {
        statusCode: 200,
        body: expensesObj,
      };
    }
    return {
      statusCode: 500,
      body: expensesObj,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const deleteNote = async (noteID, expenseID) => {
  try {
    const expenseObj = await Expense.findById(expenseID);
    const noteIndex = getIndexOfNote(expenseObj.notes, noteID);
    expenseObj.notes.splice(noteIndex, 1);
    const deleteObj = await expenseObj.save();
    if (deleteObj) {
      return {
        statusCode: 200,
        body: deleteObj,
      };
    }
    return {
      statusCode: 500,
      body: deleteObj,
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
  getAllExpenses,
  deleteNote,
};
