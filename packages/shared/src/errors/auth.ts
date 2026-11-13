import { AppError } from './base';

export class AuthError extends AppError {
  constructor(message = 'Authentication required', details?: unknown) {
    super(message, {
      code: 'UNAUTHENTICATED',
      statusCode: 401,
      details,
    });
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden for this tier or role', details?: unknown) {
    super(message, {
      code: 'FORBIDDEN',
      statusCode: 403,
      details,
    });
  }
}
