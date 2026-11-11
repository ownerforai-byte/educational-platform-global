import { AppError } from './base.js';

export class RateLimitError extends AppError {
  constructor(message = 'Rate limit or quota exceeded', details?: unknown) {
    super(message, {
      code: 'RATE_LIMIT_EXCEEDED',
      statusCode: 429,
      details,
    });
  }
}
