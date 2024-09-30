import amqp from 'amqplib';

try {
  const connection = await amqp.connect('amqp://rabbitmq');
  const channel = await connection.createChannel();

  const queue = 'hello', message = 'Hello, World!';

  await channel.assertQueue(queue, { durable: false });

  channel.sendToQueue(queue, Buffer.from(message));

  console.log(`sent message: ${message}`);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);

} catch (err) {
  throw err;
}