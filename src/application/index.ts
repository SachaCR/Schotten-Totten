import { createApp, createCommandBus, createQueryBus } from 'dyal';
import { PlayCardCommand } from './commands/playCard';
import { startGameCommand } from './commands/startGame';
import { errorHandlerMiddleware } from './middlewares/errorHandler';
import { getStateQuery } from './queries/getState';
import { GameSessionRepository } from './repositories';

export type AppDependencies = {
  gameSessionRepository: GameSessionRepository;
  logger: {
    info(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
  };
};

export function buildApp(dependencies: AppDependencies) {
  const app = createApp(dependencies);
  app.use(errorHandlerMiddleware);

  const commandBus = createCommandBus();
  commandBus.register(startGameCommand.name, startGameCommand.handler);
  commandBus.register(PlayCardCommand.name, PlayCardCommand.handler);

  app.on('command').use(commandBus.middleware);

  const queryBus = createQueryBus();
  queryBus.register(getStateQuery.name, getStateQuery.handler);
  app.on('query').use(queryBus.middleware);

  return app;
}

export * from './errors';
