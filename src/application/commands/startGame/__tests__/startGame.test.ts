import { silentLogger } from '../../../../infrastructure';
import { StartGameCommand, StartGameCommandResult } from '..';
import { buildApp } from '../../..';
import { validateGameState } from '../../../__tests__/validateGameState';
import { buildGameSessionInMemory } from '../../../../infrastructure/repositories/GameSession/InMemory';

describe('Component StartGameCommand', () => {
  describe('Given an App', () => {
    const gameSessionRepository = buildGameSessionInMemory();
    const app = buildApp({
      gameSessionRepository,
      logger: silentLogger,
    });

    describe('When I execute a StartGame command', () => {
      const startGameCommand: StartGameCommand = {
        name: 'StartGame',
        type: 'command',
        payload: {
          player1Name: 'John',
          player2Name: 'Sarah',
        },
      };

      it('Then it returns the game state', async () => {
        const result = await app.execute<StartGameCommandResult>(
          startGameCommand,
        );

        const { gameState } = result;

        expect(validateGameState(gameState)).toBeTruthy();
      });
    });
  });
});
