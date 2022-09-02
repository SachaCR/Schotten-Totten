import { Context, Next } from 'dyal';
import { AppDependencies } from '..';
import { DomainError } from '../../domain';
import { InfrastructureError } from '../../infrastructure';
import { AppCrashError, ApplicationError } from '../Errors';

export async function errorHandlerMiddleware(
  ctx: Context<AppDependencies, any, any>,
  next: Next,
) {
  try {
    await next();
  } catch (err: unknown) {
    const { logger } = ctx.dependencies;

    if (err instanceof InfrastructureError) {
      const { code, message, name } = err;
      logger.error(`${name}: ${code}: ${message}`);
      // Hide details of the infrastructure crash for security reasons.
      throw new AppCrashError();
    }

    if (err instanceof ApplicationError) {
      const { code, message } = err;
      logger.warn(`APPLICATION_ERROR: ${code}: ${message}`);
      throw err;
    }

    if (err instanceof DomainError) {
      const { code, message } = err;
      logger.info(`DOMAIN_ERROR: ${code}: ${message}`);
      throw err;
    }
  }
}
