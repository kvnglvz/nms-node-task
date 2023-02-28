import { InvalidCredentialsGraphQLError } from '../errors/invalid-credentials.graphqlerror.js';
import { UserDoesNotExistGraphQLError } from '../errors/user-does-not-exist.graphqlerror.js';
import { tokenDb, usersDb } from '../repository/index.js';
import comparePassword from '../utils/compare-password.util.js';

export default async function loginUserService(
  body: { email: string, password: string }
) {
  const { email, password } = body;

  const user = await usersDb.findUnique({
    where: {
      email,
    }
  });

  if (!user) {
    // throw no User error
    throw new UserDoesNotExistGraphQLError();
  }

  const isPasswordValidResult
    = comparePassword(user.password, user.salt, password);

  if (!isPasswordValidResult) {
    // throw invalid password
    throw new InvalidCredentialsGraphQLError();
  }
  // refresh the access token ttl ()
  const tokenEntity = await tokenDb.createToken(user.id);
  // if successful return user data (w/out password, salt)
  // and accessToken

  console.log(tokenEntity.expiration);

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    accessToken: tokenEntity.accessToken,
    expiration: tokenEntity.expiration,
  };
}