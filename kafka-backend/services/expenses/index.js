/* eslint-disable no-param-reassign */
const addExpenseHandler = require('./addExpenseHandler');
const addNoteHandler = require('./addNoteHandler');
const getExpensesHandler = require('./getExpensesHandler');

function handleRequest(msg, callback) {
  if (msg.path === 'add-expense') {
    delete msg.path;
    addExpenseHandler(msg, callback);
  } else if (msg.path === 'add-note') {
    delete msg.path;
    addNoteHandler(msg, callback);
  } else if (msg.path === 'get-expenses') {
    delete msg.path;
    getExpensesHandler(msg, callback);
  }
}

exports.handleRequest = handleRequest;
