import { STGame } from '..';

describe('Component SchottenTottenGame.endTurn()', () => {
  describe('Given a Game that just started', () => {
    describe('When player 1 plays a card and end its turn', () => {
      const game = new STGame('John', 'Sarah', {});
      game.startGame();

      game.playCard({
        playerID: STGame.PLAYER_1,
        boundaryMarkerIndex: 0,
        cardIndex: 0,
        drawFrom: 'CLAN_CARDS',
      });
      game.endTurn();

      it('Then it is player 2 turn', () => {
        expect(game.readState().currentPlayerID).toStrictEqual(STGame.PLAYER_2);
      });
    });

    describe('When player 1 tries to end its turn before playing a card', () => {
      const game = new STGame('John', 'Sarah', {});
      game.startGame();

      let error;
      try {
        game.endTurn();
      } catch (err: any) {
        error = err;
      }

      expect(error.message).toStrictEqual('PLAYER_HAS_NOT_PLAYED');
    });
  });
});
