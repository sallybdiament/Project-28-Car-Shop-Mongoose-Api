import { NextFunction, Request, Response } from 'express';
import ErrorResponse from './ErrorResponse';

class ErrorHandler {
  public static handle(
    error: ErrorResponse,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error' });
    next();
  }
}

export default ErrorHandler;