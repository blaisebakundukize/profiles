import express from 'express';
import logger from 'morgan';

const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export { app };
