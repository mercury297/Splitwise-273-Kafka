const { deleteNote } = require('../../db/controllers/expenseController');

const deleteNoteHandler = async (msg, callback) => {
  const res = {};
  const { noteID, expenseID } = msg;
  const deleteObj = await deleteNote(noteID, expenseID);
  res.status = deleteObj.statusCode;
  res.data = deleteObj.body;
  callback(null, res);
};

module.exports = deleteNoteHandler;
