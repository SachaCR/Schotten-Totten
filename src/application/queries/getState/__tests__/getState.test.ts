import { DyalApp } from 'dyal';
import { assertNever } from 'typedoc/dist/lib/utils';
import { GetStateQuery, GetStateQueryResult } from '..';
import { buildApp } from '../../..';
import { STGame } from '../../../../domain';
import { buildGameSessionInMemory } from '../../../../infrastructure/repositories/GameSession/InMemory';

describe('Component GetStateQuery', () => {
  describe('Given A game id', () => {
    describe('When I try to get the game state', () => {
      it('Then it returns the game state', async () => {
        const game = new STGame('John', 'Sarah');
        const gameId = game.readState().gameId.value();

        const gameSessionRepository = buildGameSessionInMemory();
        await gameSessionRepository.add(game);

        const app = buildApp({
          gameSessionRepository,
        });

        const getStateQuery: GetStateQuery = {
          type: 'query',
          name: 'GetState',
          payload: {
            gameId,
          },
        };

        const gameState = await app.execute<GetStateQueryResult>(getStateQuery);

        switch (gameState.outcome) {
          case 'game-found':
            expect(gameState.gameState).toHaveProperty('gameId');
            expect(gameState.gameState).toHaveProperty('player1');
            expect(gameState.gameState).toHaveProperty('player2');
            expect(gameState.gameState).toHaveProperty('boundaryMarkers');
            expect(gameState.gameState).toHaveProperty('status');
            expect(gameState.gameState).toHaveProperty('winner');
            expect(gameState.gameState).toHaveProperty('currentPlayerID');
            break;

          default:
            throw new Error('Game should have been found');
        }
      });
    });

    describe('When this id does not exists', () => {
      it('Then it returns game-not-found outcome', async () => {
        const gameId = 'toto';
        const gameSessionRepository = buildGameSessionInMemory();
        const app = buildApp({
          gameSessionRepository,
        });

        const getStateQuery: GetStateQuery = {
          type: 'query',
          name: 'GetState',
          payload: {
            gameId,
          },
        };

        const gameState = await app.execute<GetStateQueryResult>(getStateQuery);

        expect(gameState.outcome).toStrictEqual('game-not-found');
      });
    });
  });
});
