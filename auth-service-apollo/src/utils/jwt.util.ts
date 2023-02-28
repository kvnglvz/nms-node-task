import jwt from 'jsonwebtoken';

function signJwt(
  payload: any,
  tokenKey: string,
  tokenExpiration: string | number
) {
  return jwt.sign(payload, tokenKey, {
    expiresIn: Number(tokenExpiration),
  });
}

function validateJwtToken(token: string, tokenKey: string) {
  return jwt.verify(token, tokenKey, (err: any, decoded: any) => {
    if (err) {
      throw new Error('Unauthorized');
    }
    return decoded;
  });
}

export {
  signJwt,
  validateJwtToken,
};