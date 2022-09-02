export enum InfrastructureErrorCode {
  DATABASE_ERROR = 'DATABASE_ERROR',
}

export class InfrastructureError extends Error {
  public code: InfrastructureErrorCode;

  constructor(message: string, errorCode: InfrastructureErrorCode) {
    super(message);
    this.name = 'INFRASTRUCTURE_ERROR';
    this.code = errorCode;
    Object.setPrototypeOf(this, InfrastructureError.prototype);
  }
}

export class DatabaseError extends InfrastructureError {
  constructor() {
    super(
      `An error occur while querying the database`,
      InfrastructureErrorCode.DATABASE_ERROR,
    );
    Object.setPrototypeOf(this, InfrastructureError.prototype);
  }
}
