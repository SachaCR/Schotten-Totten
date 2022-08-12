import { STGame } from '../../../index';

describe('Component SchottenTottenGame', () => {
  describe('Given I want to start a SchottenTottenGame', () => {
    describe('When I create a new SchottenTottenGame()', () => {
      const game = new STGame('John', 'Sarah', {});
      it('Then it returns an instance of SchottenTottenGame', () => {
        expect(game).toBeInstanceOf(STGame);
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

      it('Then boundary markers belongs to NOBODY', () => {
        expect(
          game.readState().boundaryMarkers.every((bm) => bm.owner === 'NOBODY'),
        ).toStrictEqual(true);
      });
    });
  });
});
