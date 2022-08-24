import { createApp, createCommandBus, createQueryBus } from 'dyal';
import { startGameCommand } from './commands/startGame';
import { GameSessionRepository } from './repositories';

export type AppDependencies = {
  gameSessionRepository: GameSessionRepository;
};

export function buildApp(dependencies: AppDependencies) {
  const app = createApp(dependencies);
  const commandBus = createCommandBus();
  const queryBus = createQueryBus();

  commandBus.register(startGameCommand.name, startGameCommand.handler);

  app.on('command').use(commandBus.middleware);

  app.on('query').use(queryBus.middleware);

  return app;
}
