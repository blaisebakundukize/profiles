import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import passport from 'passport';

import { v1Router } from './api/router';
import { environment } from './helpers/environment.helpers';
import { requireToken } from './middleware/auth.middleware';

import './middleware/passport-strategies.middleware';

const app = express();

app.use(cors());
// Log requests to the console.
app.use(logger('dev'));
// Parse incoming requests data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.all(`${environment.apiPrefix}/*`, requireToken(), (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ message: err.message });
    return;
  }
  next();
});

app.use(environment.apiPrefix, v1Router);

export { app };
