import { CardTypes, STGame } from '..';
import { DomainError } from '../../errors';

describe('Component SchottenTottenGame.endTurn()', () => {
  describe('Given a Game that just started', () => {
    describe('When player 1 plays a card and end its turn', () => {
      const game = new STGame('John', 'Sarah', {});
      game.startGame();

      game.playCard({
        playerID: STGame.PLAYER_1,
        boundaryMarkerIndex: 0,
        cardIndex: 0,
        drawFrom: CardTypes.CLAN_CARDS,
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
        if (err instanceof DomainError) {
          expect(err.code).toStrictEqual('PLAYER_HAS_NOT_PLAYED');
          expect(err.name).toStrictEqual('DOMAIN_ERROR');
          expect(err.message).toStrictEqual(
            `Player must play a card before ending turn`,
          );
        }

        error = err;
      }

      expect(error).toBeInstanceOf(DomainError);
    });
  });
});
