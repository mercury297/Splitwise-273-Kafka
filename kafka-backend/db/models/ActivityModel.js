const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
  operationType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
});

const activityModel = mongoose.model('activity', activitySchema);
module.exports = activityModel;
