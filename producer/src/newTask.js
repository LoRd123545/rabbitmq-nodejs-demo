import amqp from 'amqplib';

try {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'task_queue', message = process.argv.slice(2).join(' ') || 'Hello World!';

  await channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

  console.log(`sent message: ${message}`);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);

} catch (err) {
  throw err;
}