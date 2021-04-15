/* eslint-disable camelcase */
const connection = require('./kafka/Connection');
const users = require('./services/users/index');
const passport = require('./services/passport');
const pictures = require('./services/pictures/index');
const groups = require('./services/groups/index');
const expenses = require('./services/expenses/index');

require('./db/connection');

// eslint-disable-next-line no-unused-vars
function handleTopicRequest(topic_name, fname) {
  // var topic_name = 'root_topic';
  const consumer = connection.getConsumer(topic_name);
  const producer = connection.getProducer();
  console.log(`server is running for topic ${topic_name}`);
  consumer.on('message', (message) => {
    console.log(`message received for ${topic_name} `, fname);
    console.log(JSON.stringify(message.value));
    const data = JSON.parse(message.value);

    fname.handleRequest(data.data, (err, res) => {
      console.log(`after handle${res}`);
      const payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      // eslint-disable-next-line no-shadow
      producer.send(payloads, (_err, data) => {
        console.log(data);
      });
    });
  });
}

// Add topics here
// first arg => topic name
// second arg respective service function
handleTopicRequest('users', users);
handleTopicRequest('passport', passport);
handleTopicRequest('pictures', pictures);
handleTopicRequest('groups', groups);
handleTopicRequest('expenses', expenses);
