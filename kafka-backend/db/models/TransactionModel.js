const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionSchema = new Schema({
  userThatPaid: {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  userThatOwes: {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  amountOwed: {
    type: String,
    required: true,
  },
  settledFlag: {
    type: Boolean,
    default: false,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  expense: {
    type: String,
    required: true,
  },
});

const transactionModel = mongoose.model('transaction', transactionSchema);
module.exports = transactionModel;
