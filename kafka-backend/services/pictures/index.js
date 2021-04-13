/* eslint-disable no-param-reassign */
const profilePictureHandler = require('./profilePictureHandler');
const groupPictureHandler = require('./groupPictureHandler');

function handleRequest(msg, callback) {
  if (msg.path === 'user-profile-picture') {
    delete msg.path;
    profilePictureHandler(msg, callback);
  } else if (msg.path === 'group-picture') {
    delete msg.path;
    groupPictureHandler(msg, callback);
  }
}

exports.handleRequest = handleRequest;
