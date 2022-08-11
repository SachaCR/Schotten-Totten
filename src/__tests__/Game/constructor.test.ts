import { SchottottenGame } from '../../SchottottenGame';

describe('Component SchottottenGame', () => {
  describe('Given I want to start a SchottottenGame', () => {
    describe('When I create a new SchottottenGame()', () => {
      const game = new SchottottenGame('John', 'Sarah', {});
      it('Then it returns an instance of SchottottenGame', () => {
        expect(game).toBeInstanceOf(SchottottenGame);
      });

      it('Then there is no winner yet', () => {
        expect(game.readState().winner).toStrictEqual('NOBODY');
      });

      it('Then player 1 is John', () => {
        expect(game.readState().player1.name).toStrictEqual('John');
      });

      it('Then player 2 is Sarah', () => {
        expect(game.readState().player2.name).toStrictEqual('Sarah');
      });

      it('Then player 1 has 6 cards', () => {
        expect(game.readState().player1.cards.length).toStrictEqual(6);
      });

      it('Then player 2 has 6 cards', () => {
        expect(game.readState().player2.cards.length).toStrictEqual(6);
      });

      it('Then boundary markers belongs to NOBODY', () => {
        expect(
          game.readState().boundaryMarkers.every((bm) => bm.owner === 'NOBODY'),
        ).toStrictEqual(true);
      });
    });
  });
});
