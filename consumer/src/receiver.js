import amqp from 'amqplib';

try {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const exchange = 'logs';

  await channel.assertExchange(exchange, 'fanout', { durable: false });
  const queue = await channel.assertQueue('', { exclusive: true });
  console.log('Waiting for messages...');
  await channel.bindQueue(queue.queue, exchange, '');

  channel.consume(queue.queue, (msg) => {
    console.log(msg.content.toString());
  }, { noAck: true });
} catch (err) {
  throw err;
}