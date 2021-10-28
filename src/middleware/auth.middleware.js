import { environment } from '../helpers/environment.helpers';
import { STATUS_CODES } from '../constants';
import { decodeJWT, getTokenFromRequest } from '../helpers/auth.helpers';
import models from '../database/models';

const { User } = models;

export const requireToken =
  (isTokenInBody = false) =>
  async (req, res, next) => {
    const doNotRequireTokenUrls = new RegExp(
      `^((${environment.apiPrefix}/auth.*))$`,
      'i'
    );

    const token = getTokenFromRequest(req, isTokenInBody);

    // Continue if url is not required to have a token and the token is indeed not provided.
    if (doNotRequireTokenUrls.test(req.url) && !token) {
      return next();
    }

    try {
      if (!token)
        return res
          .status(STATUS_CODES.UNAUTHORIZED)
          .json({ error: 'Missing token' });

      const data = decodeJWT(token);
      if (!data)
        return res
          .status(STATUS_CODES.UNAUTHORIZED)
          .json({ error: 'Invalid token' });

      const { payload } = data;

      const user = await User.findOne({ where: { id: payload.userId } });

      if (!user)
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ message: 'User not found' });

      req.currentUser = user;
      return next();
    } catch (error) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        error: 'Token is invalid or expired',
      });
    }
  };
