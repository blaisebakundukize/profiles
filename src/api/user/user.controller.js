import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

import { PushToDB } from '../../helpers/user.helpers';
import { STATUS_CODES } from '../../constants';
import models from '../../database/models';
import { getPagination } from '../../helpers';

const { UserProfile } = models;
const unlinkAsync = promisify(fs.unlink);

export class UserController {
  // eslint-disable-next-line consistent-return
  saveCSVUsers = (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: 'Please upload a CSV file!' });
      }

      const readable = fs.createReadStream(req.file.path);
      pipeline(readable, new PushToDB(), async (err) => {
        if (err) {
          return res.status(STATUS_CODES.BAD_REQUEST).json({
            error: 'An error occurred while transforming the CSV file.',
          });
        }

        await unlinkAsync(req.file.path);

        return res.status(STATUS_CODES.CREATED).json({
          message: 'CSV file uploaded successfully',
        });
      });
    } catch (error) {
      return res.status(STATUS_CODES.SERVER_ERROR).json({
        error: 'Could not save CSV due to internal server error',
      });
    }
  };

  getProfiles = async (req, res) => {
    try {
      const { limit, page, offset, totalRows } = await getPagination(
        req,
        UserProfile
      );

      let profiles = await UserProfile.findAll({
        limit,
        offset,
        raw: true,
      });

      if (Array.isArray(profiles) && profiles.length) {
        profiles = profiles.map((profile) => ({
          ...profile,
          errors: JSON.parse(profile.errors),
        }));
      }

      // console.log(await UserProfile.count());
      return res.json({
        data: profiles,
        currentPage: page,
        totalRows,
        limit,
      });
    } catch (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        error: 'Could not fetch profiles',
      });
    }
  };
}

const userController = new UserController();

export default userController;
