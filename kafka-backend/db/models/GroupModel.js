const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  photoURL: {
    type: String,
  },
  expenses: [{
    expenseID: {
      type: String,
      required: true,
    },
  }],
  users: [{
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  }],
});

groupSchema.plugin(uniqueValidator);
const groupModel = mongoose.model('group', groupSchema);
module.exports = groupModel;
