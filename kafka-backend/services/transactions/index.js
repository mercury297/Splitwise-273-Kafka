/* eslint-disable no-param-reassign */
const userSummaryHandler = require('./userSummaryHandler');
const leaveGroupHandler = require('./leaveGroupHandler');
const settleUpHandler = require('./settleUpHandler');

function handleRequest(msg, callback) {
  if (msg.path === 'user-summary') {
    delete msg.path;
    userSummaryHandler(msg, callback);
  } else if (msg.path === 'leave-group') {
    console.log('in HR');
    delete msg.path;
    leaveGroupHandler(msg, callback);
  } else if (msg.path === 'settle-up') {
    delete msg.path;
    settleUpHandler(msg, callback);
  }
}

exports.handleRequest = handleRequest;
