import { Repository } from 'redis-om';
import { Config } from '../config.js';
import { TokenEntity } from '../models/token.model.js';
import { signJwt } from '../utils/jwt.util.js';

export default function makeTokenDb(tokenRepository: Repository<TokenEntity>) {
  async function findToken(userId: string): Promise<TokenEntity> {
    return await tokenRepository
      .search()
      .where('userId')
      .equals(userId)
      .return.first();
  }
  
  async function createToken(userId: string): Promise<{ accessToken: string, expiration: number }> {
    const existingToken = await this.findToken(userId);
    if (existingToken) {
      return await this.findToken(userId);
    }
    const dateNow = new Date();
    const expirationDate =
      dateNow.setSeconds(dateNow.getSeconds() + Config.tokenExpiration);

    const token = signJwt({
      userId: userId,
    }, Config.tokenSecretKey, Config.tokenExpiration);

    const tokenEntity = await tokenRepository.createAndSave({
      userId: userId,
      accessToken: token,
      expiration: expirationDate,
    });
    
    await tokenRepository.expire(tokenEntity.entityId, Config.tokenExpiration);
    
    return {
      accessToken: token,
      expiration: expirationDate,
    };
  }

  async function refreshToken(userId: string) {
    const dateNow = new Date();
    const expirationDate =
      dateNow.setSeconds(dateNow.getSeconds() + Config.tokenExpiration);

    const token = await this.findToken(userId);
  }

  async function deleteToken(userId: string): Promise<void> {
    const token = await this.findToken(userId);
    return await tokenRepository.remove(token.entityId);
  }

  return {
    findToken,
    createToken,
    refreshToken,
    deleteToken,
  };
}