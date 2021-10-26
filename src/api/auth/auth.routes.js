import { Router } from 'express';

import authController from './auth.controller';

const authRouter = Router();

// register a user
authRouter.post('/register', authController.register);

// authenticate a user
authRouter.post('/login', authController.login);

export { authRouter };
