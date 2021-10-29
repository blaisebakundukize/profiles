import stream from 'stream';
import * as CSV from 'csv-string';

import models from '../database/models';
import { simpleProfileValidator } from './validator.helpers';

const { UserProfile } = models;

export class PushToDB extends stream.Transform {
  constructor(options = {}) {
    super({ ...options, objectMode: true });
  }

  async _transform(chunk, encoding, done) {
    try {
      await this.sendRowToDB(chunk.toString());
      done();
    } catch (error) {
      done(error);
    }
  }

  sendRowToDB(data) {
    return new Promise((resolve, reject) => {
      CSV.forEach(data, ',', async (row, index) => {
        if (index !== 0 && row.length === 5) {
          const profile = {
            names: row[0],
            nid: row[1],
            phone_number: row[2],
            gender: row[3],
            email: row[4],
          };

          const errors = simpleProfileValidator(profile);

          try {
            await UserProfile.findOrCreate({
              where: { ...profile, errors },
              raw: true,
            });
          } catch (error) {
            reject(error);
          }
        }
      });
      resolve();
    });
  }
}
