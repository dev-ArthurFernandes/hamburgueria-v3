import 'express-async-errors';
import express, { Application, json } from 'express';
import { handleError } from './AppError';

const app: Application = express();

app.use(json())

app.use(handleError)

export default app