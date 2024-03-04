import CustomError from './CustomError';

class InputError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

export { InputError };
