import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { environment } from './environment.helpers';

export const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const comparePassword = (hashedPassword, password) =>
  bcrypt.compareSync(password, hashedPassword);

export const generateAccessToken = (user, expiry = '1h') =>
  jsonwebtoken.sign(
    {
      userId: user.id,
    },
    environment.secretKey,
    { expiresIn: expiry }
  );

export const decodeJWT = (token) =>
  jsonwebtoken.verify(token, environment.secretKey, { complete: true });
