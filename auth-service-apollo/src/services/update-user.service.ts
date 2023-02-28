import crypto from 'crypto';
import { usersDb } from '../repository/index.js';

export default async function updateUserService(
  userId: string,
  body: { id: string, username: string; email: string; password: string; }
) {
  const { username, email, password } = body;

  const user = await usersDb.findUnique({ where: { id: userId }});

  if (!user) {
    throw new Error('User does not exists');
  }

  if (password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const encPassword = crypto.pbkdf2Sync(
      password,
      salt,
      10000,
      512,
      'sha512',
    ).toString('hex');

    user.salt = salt;
    user.password = encPassword;
  }

  if (username) {
    user.username = String(username).trim().toLowerCase();
  }

  if (email) {
    user.email = String(email).trim();
  }

  try {
    const updatedUser = await usersDb.update({
      where: {
        id: userId
      },
      data: {
        ...user
      },
      select: {
        id: true,
        email: true,
        username: true,
      }
    });
    console.log('updated user', updatedUser);
    return updatedUser;
  } catch (error) {
    throw new Error('Unable to update user');
  }
}