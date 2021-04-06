const connection = require('./kafka/Connection');

require('./db/connection');

// eslint-disable-next-line no-unused-vars
function handleTopicRequest(topicName, fname) {
  const consumer = connection.getConsumer(topicName);
  const producer = connection.getProducer();
  console.log(`server is running for ${topicName} topic`);
  consumer.on('message', (message) => {
    console.log(`message received for ${topicName} `, fname);
    console.log(JSON.stringify(message.value));
    const data = JSON.parse(message.value);

    fname.handleRequest(data.data, (err, res) => {
      console.log(`after handle ${JSON.stringify(res)}`);
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
      producer.send(payloads, (producerErr, producerData) => {
        if (err) {
          console.log(`Producer send : ${producerErr}`);
        } else {
          console.log(producerData);
        }
      });
    });
  });
}

// Add topics here
// first arg => topic name
// second arg respective service function
