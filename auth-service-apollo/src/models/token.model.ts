import { Entity, Schema } from 'redis-om';

class TokenEntity extends Entity {}

const TokenSchema = new Schema(TokenEntity, {
  userId: { type: 'string', indexed: true, },
  accessToken: { type: 'string' },
  expiration: { type: 'date' },
});

export {
  TokenEntity,
  TokenSchema,
};