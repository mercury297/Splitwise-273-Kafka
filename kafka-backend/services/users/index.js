const registerHandler = require('./registerHandler');

/* eslint-disable no-param-reassign */
function handleRequest(msg, callback) {
  if (msg.path === 'user-login') {
    delete msg.path;
    console.log('let us handle request now');
    registerHandler(msg, callback);
  }
//   else if (msg.path === 'user-register') {
//     delete msg.path;
//     updateProfileHandler(msg, callback);
//   }
}

exports.handleRequest = handleRequest;
