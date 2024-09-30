import amqp from 'amqplib'

try {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'task_queue';

  await channel.assertQueue(queue, { durable: true });

  await channel.prefetch(1);

  channel.consume(queue, (msg) => {
    const secs = parseInt(msg.content.toString().split('.').length - 1);

    console.log(`received message: ${msg.content.toString()}`);

    setTimeout(() => {
      console.log('Done!');
      channel.ack(msg);
    }, secs * 1000)
  }, {
    noAck: false
  });
} catch (err) {
  throw err;
}