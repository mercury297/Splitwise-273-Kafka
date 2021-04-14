const registerHandler = require('./registerHandler');
const loginHandler = require('./loginHandler');
const testHandler = require('./testHandler');
const updateHandler = require('./updateHandler');
const getAllUsersHandler = require('./getAllUsersHandler');
const getInvitesHandler = require('./getInvitesHandler');
const acceptInviteHandler = require('./acceptInviteHandler');
const getMyGroupsHandler = require('./getMyGroupsHandler');

/* eslint-disable no-param-reassign */
function handleRequest(msg, callback) {
  if (msg.path === 'user-register') {
    delete msg.path;
    console.log('let us handle request now');
    registerHandler(msg, callback);
  } else if (msg.path === 'user-login') {
    delete msg.path;
    loginHandler(msg, callback);
  } else if (msg.path === 'user-test') {
    delete msg.path;
    testHandler(msg, callback);
  } else if (msg.path === 'update-profile') {
    delete msg.path;
    updateHandler(msg, callback);
  } else if (msg.path === 'get-registered-users') {
    delete msg.path;
    getAllUsersHandler(msg, callback);
  } else if (msg.path === 'get-invites') {
    delete msg.path;
    getInvitesHandler(msg, callback);
  } else if (msg.path === 'accept-invite') {
    delete msg.path;
    acceptInviteHandler(msg, callback);
  } else if (msg.path === 'get-my-groups') {
    delete msg.path;
    getMyGroupsHandler(msg, callback);
  }
}

exports.handleRequest = handleRequest;
