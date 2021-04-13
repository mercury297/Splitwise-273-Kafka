/* eslint-disable no-param-reassign */
const createGroupHandler = require('./createGroupHandler');
const sendInvitesHandler = require('./sendInvitesHandler');

function handleRequest(msg, callback) {
  if (msg.path === 'create-group') {
    delete msg.path;
    createGroupHandler(msg, callback);
  } else if (msg.path === 'send-invites') {
    delete msg.path;
    sendInvitesHandler(msg, callback);
  }
}

exports.handleRequest = handleRequest;
