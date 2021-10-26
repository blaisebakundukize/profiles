import { generateAccessToken } from '../../helpers/auth.helpers';
import { cryptPassword } from '../../helpers/model.helpers';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.UserProfile, {
        foreignKey: 'belongTo',
        as: 'belongTo',
        allowNull: true,
      });
    }

    toJSON() {
      const user = { ...this.get() };
      delete user.password;
      return {
        user,
        token: generateAccessToken(user.id),
      };
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) =>
          new Promise((resolve, reject) => {
            if (user.isNewRecord) {
              cryptPassword(user.password, (error, hashedPassword) => {
                if (error) return reject(error);
                // eslint-disable-next-line no-param-reassign
                user.password = hashedPassword;

                return resolve(user, options);
              });
            }
          }),
      },
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
