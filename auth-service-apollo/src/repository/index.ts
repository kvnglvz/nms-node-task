import { PrismaClient } from '@prisma/client';
import { TokenEntity, TokenSchema } from '../models/token.model.js';
import { redisClient } from './redis.client.js';
import makeTokenDb from './token.db.js';

const prisma = new PrismaClient();

const usersDb = prisma.user;
let tokenDb : {
  findToken: (userId: string) => Promise<TokenEntity>,
  createToken: (userId: string) => Promise<{ accessToken: string, expiration: number }>,
  refreshToken: (userId: string) => Promise<void>,
  deleteToken: (userId: any) => Promise<void>,
} | undefined = undefined;

export default async function makeTokenRepository() {
  const tokenRepository = redisClient.fetchRepository(TokenSchema);
  await tokenRepository.createIndex();
  tokenDb = makeTokenDb(tokenRepository);
}

export {
  tokenDb,
  usersDb,
};