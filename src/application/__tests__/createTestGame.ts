import { DyalApp } from 'dyal';
import { GameState } from '../../domain';
import {
  StartGameCommand,
  StartGameCommandResult,
} from '../commands/startGame';

export async function createTestGame(app: DyalApp): Promise<GameState> {
  const startGameCommand: StartGameCommand = {
    name: 'StartGame',
    type: 'command',
    payload: {
      player1Name: 'John',
      player2Name: 'Sarah',
    },
  };

  const result = await app.execute<StartGameCommandResult>(startGameCommand);
  return result.gameState;
}
