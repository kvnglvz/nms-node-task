import client, { Channel, Connection } from 'amqplib';
import { Config, Constants } from '../config.js';

let rabbitMq: Connection = undefined;
let registerEmailChannel: Channel = undefined;

export default async function makeRabbitMqConnection() {
  rabbitMq = await client.connect(
    `amqp://${Config.rabbitMQUrl}`
  );
}

async function makeRegisterEmailQueue() {
  registerEmailChannel = await rabbitMq.createChannel();
  registerEmailChannel.assertQueue(Constants.registerEmailQueue, {
    durable: true,
  });
}

export {
  makeRegisterEmailQueue,
  registerEmailChannel,
  rabbitMq,
};