import { NextFunction, Request, Response } from 'express';
import { IError } from '../errors/types';

const errorHandler = (err: IError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.errorCode || 500).json({ error: err.message });
};

export default errorHandler;
