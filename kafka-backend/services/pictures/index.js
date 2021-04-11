const profilePictureHandler = require('./profilePictureHandler');

function handleRequest(msg, callback) {
  if (msg.path === 'user-profile-picture') {
    // eslint-disable-next-line no-param-reassign
    delete msg.path;
    profilePictureHandler(msg, callback);
  }
}

exports.handleRequest = handleRequest;
