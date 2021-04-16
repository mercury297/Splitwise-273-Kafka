/* eslint-disable no-param-reassign */
const recentActivityHandler = require('./recentActivityHandler');

function handleRequest(msg, callback) {
  if (msg.path === 'get-recent-activity') {
    delete msg.path;
    recentActivityHandler(msg, callback);
  }
}

exports.handleRequest = handleRequest;
