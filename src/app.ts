import express from 'express';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(routes);
app.use(errorHandler);

export default app;
