const { addNote } = require('../../db/controllers/expenseController');
const { createActivity } = require('../../db/controllers/activityController');

const addNoteHandler = async (msg, callback) => {
  const res = {};
  const {
    note, name, email, expenseID, groupName,
  } = msg;
  const addNoteObj = await addNote(note, name, email, expenseID, groupName);
  if (addNoteObj.statusCode === 201) {
    const activityRes = await createActivity('ADD_NOTE', name, groupName, email);
    if (activityRes.statusCode === 201) {
      console.log('Activity for add note: ', activityRes.body);
    }
  }
  res.status = addNoteObj.statusCode;
  res.data = addNoteObj.body;
  callback(null, res);
};

module.exports = addNoteHandler;
