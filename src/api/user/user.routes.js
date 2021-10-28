import { Router } from 'express';

import userController from './user.controller';
import { uploadFile } from '../../middleware/upload.middleware';

const userRouter = Router();

// register a user profile
userRouter.post(
  '/profiles/upload',
  uploadFile.single('file'),
  userController.saveCSVUsers
);

// get all profiles
userRouter.get('/profiles', userController.getProfiles);

export { userRouter };
