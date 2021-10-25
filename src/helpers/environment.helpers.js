import config from '../config/environment';

const env = process.env.NODE_ENV || 'development';
const environment = config[env];

export { environment };
