import { silentLogger } from '../../../../infrastructure';
import { PlayCardCommand, PlayCardCommandResult } from '..';
import { buildApp, ApplicationError, InvalidCommandError } from '../../..';
import { buildGameSessionInMemory } from '../../../../infrastructure/repositories/GameSession/InMemory';
import { CardTypes, GameState, PlayerID, UuidGameId } from '../../../../domain';
import { createTestGame } from '../../../__tests__/createTestGame';
import { validateGameState } from '../../../__tests__/validateGameState';

describe('Component PlayCardCommand', () => {
  describe('Given a game that just started', () => {
    const gameSessionRepository = buildGameSessionInMemory();
    const app = buildApp({
      gameSessionRepository,
      logger: silentLogger,
    });

    describe('When I execute a valid PlayCard command', () => {
      it('Then it returns the new game state', async () => {
        const gameState: GameState = await createTestGame(app);

        const PlayCardCommand: PlayCardCommand = {
          name: 'PlayCard',
          type: 'command',
          payload: {
            boundaryMarkerIndex: 0,
            cardIndex: 0,
            gameId: gameState.gameId.value(),
            drawFrom: CardTypes.CLAN_CARDS,
            playerID: PlayerID.ONE,
          },
        };

        const result = await app.execute<PlayCardCommandResult>(
          PlayCardCommand,
        );
        const newGameState = result.gameState;

        expect(validateGameState(newGameState)).toBeTruthy();

        expect(newGameState.gameId.value()).toStrictEqual(
          gameState.gameId.value(),
        );

        expect(
          newGameState.boundaryMarkers[0].player1Cards.length,
        ).toStrictEqual(1);
      });
    });

    describe('When I execute an invalid PlayCard command', () => {
      it('Then it throws an INVALID_COMMAND error code', async () => {
        const gameState: GameState = await createTestGame(app);

        const PlayCardCommand: PlayCardCommand = {
          name: 'PlayCard',
          type: 'command',
          payload: {
            boundaryMarkerIndex: -1,
            cardIndex: -1,
            gameId: gameState.gameId.value(),
            drawFrom: CardTypes.CLAN_CARDS,
            playerID: PlayerID.ONE,
          },
        };

        let error: ApplicationError | undefined = undefined;

        try {
          await app.execute<PlayCardCommandResult>(PlayCardCommand);
        } catch (err: unknown) {
          expect(err).toBeInstanceOf(ApplicationError);
          error = err as ApplicationError;
        }

        if (!error) {
          throw new Error('Error should not be undefined');
        }

        expect(error.name).toStrictEqual('APPLICATION_ERROR');
        expect(error.code).toStrictEqual('INVALID_COMMAND');

        const invalidCommandError = error as InvalidCommandError;
        expect(invalidCommandError.message).toStrictEqual(
          `The command you tried to execute is invalid`,
        );

        expect(invalidCommandError.getValidationErrors()).toStrictEqual([
          {
            code: 'too_small',
            message: 'Number must be greater than or equal to 0',
            path: 'cardIndex',
          },
          {
            code: 'too_small',
            message: 'Number must be greater than or equal to 0',
            path: 'boundaryMarkerIndex',
          },
        ]);

        expect(invalidCommandError.getReadableErrors()).toStrictEqual(
          `- cardIndex: Number must be greater than or equal to 0\n- boundaryMarkerIndex: Number must be greater than or equal to 0`,
        );
      });
    });

    describe('When I execute a PlayCard command for an unknown game id', () => {
      it('Then it returns a NOT_FOUND error', async () => {
        const PlayCardCommand: PlayCardCommand = {
          name: 'PlayCard',
          type: 'command',
          payload: {
            boundaryMarkerIndex: 0,
            cardIndex: 0,
            gameId: new UuidGameId().value(),
            drawFrom: CardTypes.CLAN_CARDS,
            playerID: PlayerID.ONE,
          },
        };

        let error: ApplicationError | undefined = undefined;

        try {
          await app.execute<PlayCardCommandResult>(PlayCardCommand);
        } catch (err: unknown) {
          expect(err).toBeInstanceOf(ApplicationError);
          error = err as ApplicationError;
        }

        if (!error) {
          throw new Error('Error should not be undefined');
        }

        expect(error.name).toStrictEqual('APPLICATION_ERROR');
        expect(error.code).toStrictEqual('NOT_FOUND');
        expect(error.message).toStrictEqual(
          `We cannot find the context to execute this command`,
        );
      });
    });
  });
});
