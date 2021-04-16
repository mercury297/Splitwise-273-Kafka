const { deleteNote } = require('../../db/controllers/expenseController');
const { createActivity } = require('../../db/controllers/activityController');

const deleteNoteHandler = async (msg, callback) => {
  const res = {};
  const {
    noteID, expenseID, name, groupName, email,
  } = msg;
  const deleteObj = await deleteNote(noteID, expenseID);
  if (deleteObj.statusCode === 200) {
    const activityRes = await createActivity('DELETE_NOTE', name, groupName, email);
    if (activityRes.statusCode === 201) {
      console.log('Activity for delete note: ', activityRes.body);
    }
  }
  res.status = deleteObj.statusCode;
  res.data = deleteObj.body;
  callback(null, res);
};

module.exports = deleteNoteHandler;
