import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { environment } from './environment.helpers';

export const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const comparePassword = (hashedPassword, password) =>
  bcrypt.compareSync(password, hashedPassword);

export const generateAccessToken = (userId, expiry = '1h') =>
  jsonwebtoken.sign(
    {
      userId,
    },
    environment.secretKey,
    { expiresIn: expiry }
  );

export const decodeJWT = (token) =>
  jsonwebtoken.verify(token, environment.secretKey, { complete: true });

export const getTokenFromRequest = (req, inBody) => {
  let {
    headers: { authorization },
  } = req;

  if (inBody) {
    authorization = req.body.token;
  }

  if (inBody && authorization) {
    return authorization;
  }

  if (authorization && authorization.split(' ')[0].toLowerCase() === 'bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};
