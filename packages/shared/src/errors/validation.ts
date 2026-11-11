import { AppError } from './base.js';

export class ValidationError extends AppError {
  constructor(message = 'Validation failed', details?: unknown) {
    super(message, {
      code: 'VALIDATION_FAILED',
      statusCode: 400,
      details,
    });
  }
}
