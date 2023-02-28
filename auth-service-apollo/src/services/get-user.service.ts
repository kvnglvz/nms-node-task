import { UserDoesNotExistGraphQLError } from '../errors/user-does-not-exist.graphqlerror.js';
import { usersDb } from '../repository/index.js';

export default async function getUserService(
  user: { id: string }
) {
  const { id } = user;

  console.log('finding user with id', id);

  try {
    return await usersDb.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        username: true,
        email: true,
      }
    });
  } catch (error) {
    throw new UserDoesNotExistGraphQLError();
  }
}