// Was planning to use event emitters but nah
import { registerEmailChannel } from './index.js';
import { Constants } from '../config.js';

export default async function userCreatedProducer(email: string, username: string) {
  if (!email) return;

  const registeredEmail = {
    email: email,
    username: username,
  };

  registerEmailChannel.sendToQueue(
    Constants.registerEmailQueue,
    Buffer.from(JSON.stringify(registeredEmail))
  );
}