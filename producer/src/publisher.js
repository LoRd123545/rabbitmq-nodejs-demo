import amqp from 'amqplib';

try {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const exchange = 'logs';
  const msg = process.argv.slice(2).join(' ') || 'Hello, World!';

  await channel.assertExchange(exchange, 'fanout', { durable: false });
  channel.publish(exchange, '', Buffer.from(msg));
  console.log(`sent message: ${msg}`);

  setTimeout(async () => {
    await connection.close();
  }, 500);
} catch (err) {
  throw err;
}