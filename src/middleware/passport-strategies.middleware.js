import passport from 'passport';
import LocalStrategy from 'passport-local';

import { comparePassword } from '../helpers/auth.helpers';
import models from '../database/models';

const { User } = models;

export const localStrategy = new LocalStrategy.Strategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
  },
  async (username, password, next) => {
    const error = 'Invalid username or password';
    console.log(username.password);
    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return next(error, false);
      }
      const isValid = comparePassword(user.password, password);

      if (isValid) {
        return next(null, user);
      }
      return next(error, false);
    } catch (err) {
      return next({ error: err.message || err }, false);
    }
  }
);

passport.use(localStrategy);
