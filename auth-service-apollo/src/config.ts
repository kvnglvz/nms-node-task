import { config as initializeEnv } from 'dotenv';

let Config = {
  port: undefined,
  databaseUrl: undefined,
  redisUrl: undefined,
  tokenExpiration: undefined,
  tokenSecretKey: undefined,
  refreshTokenExpiration: undefined,
  refreshTokenSecretKey: undefined,
  rabbitMQUrl: undefined,
};

const Constants = {
  registerEmailQueue: 'QUEUE_REGISTER_EMAIL'
};

export default function initializeConfig() {
  initializeEnv();
  Config = {
    port: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    tokenExpiration: process.env.TOKEN_EXPIRATION,
    tokenSecretKey: process.env.TOKEN_SECRET_KEY,
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
    refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
    rabbitMQUrl: process.env.RABBITMQ_URL
  };
}

export {
  Config,
  Constants
};