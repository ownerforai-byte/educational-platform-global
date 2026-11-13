import { AppError } from './base';

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', details?: unknown) {
    super(message, {
      code: 'NOT_FOUND',
      statusCode: 404,
      details,
    });
  }
}
