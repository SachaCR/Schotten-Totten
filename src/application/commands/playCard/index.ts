import zod from 'zod';
import { Command, Context } from 'dyal';

import { CardTypes, GameState, PlayerID, UuidGameId } from '../../../domain';
import { AppDependencies } from '../..';
import {
  InvalidCommandError,
  NotFoundError,
  reshapeZodIssueIntoValidationError,
} from '../../../application/errors';

type PlayCardCommandContext = Context<
  AppDependencies,
  PlayCardCommand,
  PlayCardCommandResult
>;

const commandName = 'PlayCard' as const;
type CommandName = typeof commandName;

const PlayerIDEnum = zod.nativeEnum(PlayerID);
const CardTypesEnum = zod.nativeEnum(CardTypes);

const playCardCommandSchema = zod.object({
  gameId: zod.string().uuid(),
  playerID: PlayerIDEnum,
  cardIndex: zod.number().gte(0).int(),
  boundaryMarkerIndex: zod.number().gte(0).int(),
  drawFrom: CardTypesEnum,
});

export interface PlayCardCommand extends Command {
  name: CommandName;
  payload: {
    gameId: string;
    playerID: PlayerID;
    cardIndex: number;
    boundaryMarkerIndex: number;
    drawFrom: CardTypes;
  };
}

export type PlayCardCommandResult = {
  gameState: GameState;
};

async function playCardCommandHandler(
  ctx: PlayCardCommandContext,
): Promise<PlayCardCommandResult> {
  const payloadIsValid = playCardCommandSchema.safeParse(ctx.useCase.payload);

  if (!payloadIsValid.success) {
    const validationErrors = payloadIsValid.error.issues.map(
      reshapeZodIssueIntoValidationError,
    );

    const error = new InvalidCommandError(validationErrors);
    throw error;
  }

  const {
    boundaryMarkerIndex,
    cardIndex,
    drawFrom,
    gameId: gameIdString,
    playerID,
  } = ctx.useCase.payload;

  const { gameSessionRepository } = ctx.dependencies;

  const gameId = UuidGameId.fromString(gameIdString);

  const game = await gameSessionRepository.getById(gameId);

  if (!game) {
    throw new NotFoundError();
  }

  game.playCard({
    boundaryMarkerIndex,
    cardIndex,
    drawFrom,
    playerID,
  });

  return {
    gameState: game.readState(),
  };
}

export const PlayCardCommand = {
  handler: playCardCommandHandler,
  name: commandName,
};
