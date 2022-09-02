import { silentLogger } from '../../../../infrastructure';
import { StartGameCommand, StartGameCommandResult } from '..';
import { buildApp } from '../../..';
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

        // @TODO write a function that validates an object is a game state.
        expect(gameState).toHaveProperty('gameId');
        expect(gameState).toHaveProperty('player1');
        expect(gameState).toHaveProperty('player2');
        expect(gameState).toHaveProperty('boundaryMarkers');
        expect(gameState).toHaveProperty('status');
        expect(gameState).toHaveProperty('winner');
        expect(gameState).toHaveProperty('currentPlayerID');
      });
    });
  });
});
