import { IError } from './types';

abstract class CustomError extends Error implements IError {
  errorCode: number;

  constructor(message: string, errorCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.errorCode = errorCode;
  }
}

export default CustomError;
