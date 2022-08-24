import { GameSessionRepository } from '../../../../application/repositories';
import { GameId, STGame } from '../../../../domain';

export function buildGameSessionInMemory(): GameSessionRepository {
  const games: STGame[] = [];

  return {
    add: async (game: STGame): Promise<void> => {
      games.push(game);
    },
    getById: async (id: GameId): Promise<STGame | undefined> => {
      return games.find(
        (game) => game.readState().gameId.value() === id.value(),
      );
    },
  };
}
