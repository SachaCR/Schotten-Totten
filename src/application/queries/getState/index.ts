import { Query, Context } from 'dyal';
import { GameState, UuidGameId } from '../../../domain';
import { AppDependencies } from '../..';

type GetStateQueryContext = Context<
  AppDependencies,
  GetStateQuery,
  GetStateQueryResult
>;

const queryName = 'GetState' as const;
type QueryName = typeof queryName;

export interface GetStateQuery extends Query {
  name: QueryName;
  payload: {
    gameId: string;
  };
}

export type GetStateQueryResult =
  | {
      outcome: 'game-found';
      gameState: GameState;
    }
  | {
      outcome: 'game-not-found';
    };

async function getStateQueryHandler(
  ctx: GetStateQueryContext,
): Promise<GetStateQueryResult> {
  const { gameId: gameIdString } = ctx.useCase.payload;
  const { gameSessionRepository } = ctx.dependencies;

  const gameId = UuidGameId.fromString(gameIdString);

  const game = await gameSessionRepository.getById(gameId);

  if (!game) {
    return {
      outcome: 'game-not-found',
    };
  }

  return {
    outcome: 'game-found',
    gameState: game.readState(),
  };
}

export const getStateQuery = {
  handler: getStateQueryHandler,
  name: queryName,
};
