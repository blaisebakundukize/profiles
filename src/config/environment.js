import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_HOST,
    dialect: 'postgres',
    secretKey: process.env.SECRET_KEY || '',
    apiPrefix: process.env.API_PREFIX || '/api/v1',
  },
  test: {},
  production: {},
};
