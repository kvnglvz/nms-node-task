import { config as initializeEnv } from 'dotenv';

let Config = {
  port: undefined,
  rabbitMQUrl: undefined,
};

export default function initializeConfig() {
  initializeEnv();
  Config = {
    port: process.env.PORT,
    rabbitMQUrl: process.env.RABBITMQ_URL
  };
}

const Constants = {
  registerEmailQueue: 'QUEUE_REGISTER_EMAIL'
};

export {
  Config,
  Constants
};