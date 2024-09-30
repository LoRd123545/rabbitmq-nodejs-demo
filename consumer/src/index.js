import amqp from 'amqplib'

try {
  const connection = await amqp.connect('amqp://rabbitmq');
  const channel = await connection.createChannel();

  const queue = 'hello';

  await channel.assertQueue(queue, { durable: false });

  channel.consume(queue, (msg) => {
    console.log(`received message: ${msg.content.toString()}`);
  }, {
    noAck: true
  });
} catch (err) {
  throw err;
}