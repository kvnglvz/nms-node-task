import crypto from 'crypto';
import userCreatedProducer from '../producers/user-created.producer.js';
import { usersDb } from '../repository/index.js';

export default async function createUserService(
  body: { username: string; email: string; password: string; }
) {
  const { username, email, password } = body;

  const salt = crypto.randomBytes(16).toString('hex');
  const encPassword = crypto.pbkdf2Sync(
    password,
    salt,
    10000,
    512,
    'sha512',
  ).toString('hex');

  try {
    const createdUser = await usersDb.create({
      data: {
        username: String(username).trim().toLowerCase(),
        email: String(email).trim(),
        password: encPassword,
        salt,
      }
    });

    userCreatedProducer(createdUser.email, createdUser.username);
    
    return createdUser;
  } catch (error) {
    throw new Error('Unable to create user');
  }
}