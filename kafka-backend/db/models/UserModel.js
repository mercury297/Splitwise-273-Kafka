const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  language: {
    type: String,
    default: 'en',
    required: true,
  },
  currency: {
    type: String,
    default: 'USD',
    required: true,
  },
  timezone: {
    type: String,
    default: 'Americas/Los_Angeles',
    required: true,
  },
  photoURL: {
    type: String,
  },
  groups: [{
    groupName: {
      type: String,
      required: true,
    },
    inviteAccepted: {
      type: Boolean,
      default: false,
    },
  }],
},
{
  versionKey: false,
});

usersSchema.plugin(uniqueValidator);
const userModel = mongoose.model('user', usersSchema);
module.exports = userModel;
