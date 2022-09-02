import { GetStateQuery, GetStateQueryResult } from '..';
import { buildApp } from '../../..';
import { STGame } from '../../../../domain';
import { silentLogger } from '../../../../infrastructure';
import { buildGameSessionInMemory } from '../../../../infrastructure/repositories/GameSession/InMemory';
import { ApplicationError } from '../../../errors';

describe('Component GetStateQuery', () => {
  describe('Given A game id', () => {
    describe('When I try to get the game state', () => {
      it('Then it returns the game state', async () => {
        const game = new STGame('John', 'Sarah');
        const gameId = game.readState().gameId.value();

        const gameSessionRepository = buildGameSessionInMemory();
        await gameSessionRepository.add(game);

        const app = buildApp({
          logger: silentLogger,
          gameSessionRepository,
        });

        const getStateQuery: GetStateQuery = {
          type: 'query',
          name: 'GetState',
          payload: {
            gameId,
          },
        };

        const gameStateResult = await app.execute<GetStateQueryResult>(
          getStateQuery,
        );

        const gameState = gameStateResult.gameState;

        expect(gameState).toHaveProperty('gameId');
        expect(gameState).toHaveProperty('player1');
        expect(gameState).toHaveProperty('player2');
        expect(gameState).toHaveProperty('boundaryMarkers');
        expect(gameState).toHaveProperty('status');
        expect(gameState).toHaveProperty('winner');
        expect(gameState).toHaveProperty('currentPlayerID');
      });
    });

    describe('When this id does not exists', () => {
      it('Then it throws an error', async () => {
        const gameId = 'toto';
        const gameSessionRepository = buildGameSessionInMemory();
        const app = buildApp({
          logger: silentLogger,
          gameSessionRepository,
        });

        const getStateQuery: GetStateQuery = {
          type: 'query',
          name: 'GetState',
          payload: {
            gameId,
          },
        };

        let error;

        try {
          await app.execute<GetStateQueryResult>(getStateQuery);
        } catch (err: unknown) {
          if (err instanceof ApplicationError) {
            expect(err.code).toStrictEqual('NOT_FOUND');
            expect(err.name).toStrictEqual('APPLICATION_ERROR');
            expect(err.message).toStrictEqual(
              `We cannot find the context to execute this command`,
            );
          }

          error = err;
        }

        expect(error).toBeInstanceOf(ApplicationError);
      });
    });
  });
});
