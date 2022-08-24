import { GameId, STGame } from '../../domain';

export interface GameSessionRepository {
  add(game: STGame): Promise<void>;
  getById(id: GameId): Promise<STGame | undefined>;
}
