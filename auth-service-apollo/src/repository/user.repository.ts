import { User } from '@prisma/client';
import { usersDb } from './index.js';
import createUserService from '../services/create-user.service.js';

export default function userRepository() {
  async function findAllUsers(): Promise<User[]> {
    return await usersDb.findMany();
  }

  async function findUser(userId: string): Promise<User | undefined> {
    return await usersDb.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async function createUser(
    body: { username: string; email: string; password: string; }
  ): Promise<User | undefined> {
    return await createUserService(body);
  }

  async function updateUser(): Promise<User | undefined> {
    return undefined;
  }

  return {
    findAllUsers,
    findUser,
    createUser,
    updateUser,
  };
}