import { Client } from 'redis-om';
import { Config } from '../config.js';

let redisClient: Client | undefined = undefined;

export default async function initializeRedis() {
  redisClient = await new Client().open(Config.redisUrl);
}

export {
  redisClient
};