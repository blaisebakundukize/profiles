import bcrypt from 'bcrypt';

export function cryptPassword(password, callback) {
  const SALT_WORK_FACTOR = 10;
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return callback(err);

    bcrypt.hash(password, salt, (error, hash) => callback(error, hash));

    return null;
  });
}
