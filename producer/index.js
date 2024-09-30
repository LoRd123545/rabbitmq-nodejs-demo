const amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq', (error0, connection) => {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const queue = 'hello', message = 'Hello, World!';

    channel.assertQueue(queue, { durable: false });

    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`sent message: ${message}`);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  })
})