import { GameState } from '../../domain';

export function validateGameState(gameState: GameState): boolean {
  expect(gameState).toHaveProperty('gameId');
  expect(gameState).toHaveProperty('player1');
  expect(gameState).toHaveProperty('player2');
  expect(gameState).toHaveProperty('boundaryMarkers');
  expect(gameState).toHaveProperty('status');
  expect(gameState).toHaveProperty('winner');
  expect(gameState).toHaveProperty('currentPlayerID');

  return true;
}
