import { ZodIssue } from 'zod';

export enum ApplicationErrorCode {
  INVALID_COMMAND = 'INVALID_COMMAND',
  NOT_FOUND = 'NOT_FOUND',
  APP_CRASHED = 'APP_CRASHED',
}

export class ApplicationError extends Error {
  public code: ApplicationErrorCode;

  constructor(message: string, errorCode: ApplicationErrorCode) {
    super(message);
    this.name = 'APPLICATION_ERROR';
    this.code = errorCode;
    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}

export class InvalidCommandError extends ApplicationError {
  private errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super(
      `The command you tried to execute is invalid`,
      ApplicationErrorCode.INVALID_COMMAND,
    );

    this.errors = errors;

    Object.setPrototypeOf(this, InvalidCommandError.prototype);
  }

  public getValidationErrors(): ValidationError[] {
    return this.errors;
  }

  public getReadableErrors(): string {
    const validationErrorDetails = this.errors
      .map((error) => `- ${error.path}: ${error.message}`)
      .join('\n');

    return validationErrorDetails;
  }
}

export interface ValidationError {
  code: string;
  message: string;
  path: string;
}

export function reshapeZodIssueIntoValidationError(
  issue: ZodIssue,
): ValidationError {
  return {
    code: issue.code,
    message: issue.message,
    path: issue.path.join(),
  };
}

export class NotFoundError extends ApplicationError {
  constructor() {
    super(
      `We cannot find the context to execute this command`,
      ApplicationErrorCode.NOT_FOUND,
    );

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class AppCrashError extends ApplicationError {
  constructor() {
    super(
      `Sorry an unexpected error happened.`,
      ApplicationErrorCode.APP_CRASHED,
    );

    Object.setPrototypeOf(this, AppCrashError.prototype);
  }
}
