import { Command, Context } from 'dyal';
import { GameState, STGame } from '../../../domain';
import { AppDependencies } from '../..';

type StartGameCommandContext = Context<
  AppDependencies,
  StartGameCommand,
  StartGameCommandResult
>;

const commandName = 'StartGame' as const;
type CommandName = typeof commandName;

export interface StartGameCommand extends Command {
  name: CommandName;
  payload: {
    player1Name: string;
    player2Name: string;
  };
}

export interface StartGameCommandResult {
  gameState: GameState;
}

async function startGameCommandHandler(
  ctx: StartGameCommandContext,
): Promise<StartGameCommandResult> {
  const { player1Name, player2Name } = ctx.useCase.payload;
  const { gameSessionRepository } = ctx.dependencies;

  const game = new STGame(player1Name, player2Name);
  game.shuffleDecks();
  game.startGame();

  await gameSessionRepository.add(game);

  return {
    gameState: game.readState(),
  };
}

export const startGameCommand = {
  handler: startGameCommandHandler,
  name: commandName,
};
