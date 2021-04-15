const { addNote } = require('../../db/controllers/expenseController');

const addNoteHandler = async (msg, callback) => {
  const res = {};
  const {
    note, name, email, expenseID,
  } = msg;
  const addNoteObj = await addNote(note, name, email, expenseID);
  res.status = addNoteObj.statusCode;
  res.data = addNoteObj.body;
  callback(null, res);
};

module.exports = addNoteHandler;
