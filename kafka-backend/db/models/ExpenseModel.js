const mongoose = require('mongoose');

const { Schema } = mongoose;

const expenseSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paidEmail: {
    type: String,
    required: true,
  },
  paidName: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  notes: [{
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
  }],
});

const expenseModel = mongoose.model('expense', expenseSchema);
module.exports = expenseModel;
