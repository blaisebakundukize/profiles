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

  // csv2arr = (str) => {
  //   let line = [''];
  //   const ret = [line];
  //   let quote = false;

  //   for (let i = 0; i < str.length; i++) {
  //     const cur = str[i];
  //     const next = str[i + 1];

  //     if (!quote) {
  //       const cellIsEmpty = line[line.length - 1].length === 0;
  //       if (cur === '"' && cellIsEmpty) quote = true;
  //       else if (cur === ',') line.push('');
  //       else if (cur === '\r' && next === '\n') {
  //         line = [''];
  //         ret.push(line);
  //         i++;
  //       } else if (cur === '\n' || cur === '\r') {
  //         line = [''];
  //         ret.push(line);
  //       } else line[line.length - 1] += cur;
  //     } else if (cur === '"' && next === '"') {
  //       line[line.length - 1] += cur;
  //       i++;
  //     } else if (cur === '"') quote = false;
  //     else line[line.length - 1] += cur;
  //   }
  //   return ret[0];
  // };

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
            // await models.sequelize.transaction(async (t) => {
            const userProfile = await UserProfile.findOrCreate({
              where: { ...profile, errors },
            });

            // if (userProfile[0]._options.isNewRecord) {
            //   console.log(userProfile);
            // }
            //   const errors =
            // errors.forEach(async (error) => {
            //   await ProfileError.create(error);
            // });
            // console.log();

            // for (let i = 0; i < errors.length; i++) {
            //   await ProfileError.create(errors[i]);
            // }
            // console.log(errors);

            // await ProfileError.bulkCreate([...errors]);
            // }

            // await UserProfile.create({
            //   names: 'Blaise',
            //   nid: 12423423,
            //   phone_number: 9129392,
            //   gender: 'male',
            //   email: 'blaiseb@gmail.com',
            // });
            // });
          } catch (error) {
            reject(error);
          }
        }
      });
      resolve();
    });
  }
}
