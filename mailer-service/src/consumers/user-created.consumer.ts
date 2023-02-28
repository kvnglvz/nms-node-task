// Was planning to use event emitters but nah
import { registerEmailChannel } from './index.js';
import { Constants } from '../config.js';
import emailRegisteredUserService from '../services/email-registered-user.service.js';

export default async function makeUserCreatedConsumer() {
  registerEmailChannel.consume(
    Constants.registerEmailQueue,
    userCreatedEvent,
    {
      noAck: true,
    }
  );
}

function userCreatedEvent(data) {
  const createdUser = JSON.parse(data.content.toString());
  emailRegisteredUserService(createdUser);
}