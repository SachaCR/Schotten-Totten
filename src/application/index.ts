import { createApp, createCommandBus, createQueryBus } from 'dyal';
import { startGameCommand } from './commands/startGame';
import { getStateQuery } from './queries/getState';
import { GameSessionRepository } from './repositories';

export type AppDependencies = {
  gameSessionRepository: GameSessionRepository;
};

export function buildApp(dependencies: AppDependencies) {
  const app = createApp(dependencies);

  const commandBus = createCommandBus();
  commandBus.register(startGameCommand.name, startGameCommand.handler);
  app.on('command').use(commandBus.middleware);

  const queryBus = createQueryBus();
  queryBus.register(getStateQuery.name, getStateQuery.handler);
  app.on('query').use(queryBus.middleware);

  return app;
}
