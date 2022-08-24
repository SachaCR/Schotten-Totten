import { createApp, createCommandBus, createQueryBus } from 'dyal';
import { GameSessionRepository } from './repositories';

type AppDependencies = {
  gameSessionRepository: GameSessionRepository;
};

export function buildApp(dependencies: AppDependencies) {
  const commandBus = createCommandBus();
  const queryBus = createQueryBus();

  const app = createApp(dependencies);

  app.on('command').use(commandBus.middleware);
  app.on('query').use(queryBus.middleware);

  return app;
}
