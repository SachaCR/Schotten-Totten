import { SchottenTottenGame } from '../../SchottenTottenGame';

describe('Component SchottenTottenGame.startGame()', () => {
  describe('Given a SchottenTottenGame', () => {
    const game = new SchottenTottenGame('John', 'Sarah', {});

    describe('When I start the game', () => {
      game.startGame();

      it('Then player 1 has 6 cards', () => {
        expect(game.readState().player1.cards.length).toStrictEqual(6);
      });

      it('Then player 2 has 6 cards', () => {
        expect(game.readState().player2.cards.length).toStrictEqual(6);
      });
    });
  });

  describe('Given a started SchottenTottenGame', () => {
    const game = new SchottenTottenGame('John', 'Sarah', {});
    game.startGame();

    describe('When I start the game again', () => {
      game.startGame();

      it('Then player 1 has still 6 cards', () => {
        expect(game.readState().player1.cards.length).toStrictEqual(6);
      });

      it('Then player 2 has still 6 cards', () => {
        expect(game.readState().player2.cards.length).toStrictEqual(6);
      });
    });
  });
});
