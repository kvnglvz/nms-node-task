import { Config } from '../config.js';
import { AuthenticationMissingGraphQLError } from '../errors/token-problem.graphqlerror.js';
import { UnauthorizedGraphQLError } from '../errors/unauthorized.graphqlerror.js';
import { usersDb } from '../repository/index.js';
import { validateJwtToken } from '../utils/jwt.util.js';

export default async function authContext (req, res) {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');

    if (bearer[0] === 'Bearer') {
      const bearerToken = bearer[1];
      let decodedToken = undefined;
      try {
        decodedToken = validateJwtToken(bearerToken, Config.tokenSecretKey);
      } catch (error) {
        throw new UnauthorizedGraphQLError();
      }
      if (decodedToken) {
        const user = await usersDb.findUnique({
          where: {
            id: decodedToken.userId
          },
          select: {
            id: true,
            email: true,
            username: true,
          }
        });
        if (user) {
          return { user };
        } else {
          throw new AuthenticationMissingGraphQLError();
        }
      }
    } else {
      throw new AuthenticationMissingGraphQLError();
    }  
  }
} 