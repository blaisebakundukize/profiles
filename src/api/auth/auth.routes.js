import { Router } from 'express';

import authController from './auth.controller';

const authRouter = Router();

// register a user
authRouter.post('/register', authController.register);

export { authRouter };
