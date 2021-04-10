const registerHandler = require('./registerHandler');
const loginHandler = require('./loginHandler');

/* eslint-disable no-param-reassign */
function handleRequest(msg, callback) {
  if (msg.path === 'user-register') {
    delete msg.path;
    console.log('let us handle request now');
    registerHandler(msg, callback);
  } else if (msg.path === 'user-login') {
    delete msg.path;
    loginHandler(msg, callback);
  }
}

exports.handleRequest = handleRequest;
