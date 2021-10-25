import models from '../../database/models';

import { STATUS_CODES } from '../../constants';
import { comparePassword } from '../../helpers/auth.helpers';

const { User } = models;

export class AuthController {
  register = async (req, res) => {
    try {
      // The new user body can be validated by a middleware.
      const { username, password, confirmPassword } = req.body;

      const user = await User.findOne({ where: { username } });

      if (user) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: `Username is already token` });
      }

      if (password !== confirmPassword) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: `Password & confirmPassword do not match` });
      }

      const newUser = await User.create({
        username,
        password,
      });

      return res.status(STATUS_CODES.CREATED).json({
        message: 'Registration completed successfully',
        ...newUser.toJSON(),
      });
    } catch (error) {
      return res.status(STATUS_CODES.SERVER_ERROR).json({
        error: 'Could not complete registration due to internal server error',
      });
    }
  };
}

const authController = new AuthController();

export default authController;
