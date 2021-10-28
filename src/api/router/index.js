import { Router } from 'express';

import { authRouter } from '../auth/auth.routes';
import { userRouter } from '../user/user.routes';

const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/users', userRouter);

export { v1Router };
