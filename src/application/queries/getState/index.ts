import { Query, Context } from 'dyal';
import { GameState, UuidGameId } from '../../../domain';
import { AppDependencies } from '../..';
import { NotFoundError } from '../../Errors';

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

export type GetStateQueryResult = {
  gameState: GameState;
};

async function getStateQueryHandler(
  ctx: GetStateQueryContext,
): Promise<GetStateQueryResult> {
  const { gameId: gameIdString } = ctx.useCase.payload;
  const { gameSessionRepository } = ctx.dependencies;

  const gameId = UuidGameId.fromString(gameIdString);

  const game = await gameSessionRepository.getById(gameId);

  if (!game) {
    throw new NotFoundError();
  }

  return {
    gameState: game.readState(),
  };
}

export const getStateQuery = {
  handler: getStateQueryHandler,
  name: queryName,
};
