import express from 'express';
import logger from 'morgan';

import { v1Router } from './api/router';
import { environment } from './helpers/environment.helpers';

const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(environment.apiPrefix, v1Router);

export { app };
