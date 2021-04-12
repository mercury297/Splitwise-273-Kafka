const createGroupHandler = require('./createGroupHandler');

function handleRequest(msg, callback) {
  if (msg.path === 'create-group') {
    // eslint-disable-next-line no-param-reassign
    delete msg.path;
    createGroupHandler(msg, callback);
  }
}

exports.handleRequest = handleRequest;
