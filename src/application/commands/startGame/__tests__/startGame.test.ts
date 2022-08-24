import { StartGameCommand } from '..';
import { buildApp } from '../../..';
import { buildGameSessionInMemory } from '../../../../infrastructure/repositories/GameSession/InMemory';

describe('Component StartGameCommand', () => {
  describe('Given an App', () => {
    const gameSessionRepository = buildGameSessionInMemory();
    const app = buildApp({
      gameSessionRepository,
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

      it('Then', async () => {
        const result = await app.execute(startGameCommand);

        expect(result).toStrictEqual({ gameId: expect.any(String) });
      });
    });
  });
});
