import { CardTypes, STGame } from '../';

describe('Component SchottenTottenGame()', () => {
  describe('Given an un-shuffled SchottenTottenGame', () => {
    const game = new STGame('John', 'Sarah', {});
    game.startGame();

    describe('When 3 markers are won by player 1', () => {
      for (let i = 0; i < 9 * 3; i++) {
        const boundaryMarkerIndex = parseInt(Math.floor(i / 3).toFixed(0));

        game.playCard({
          playerID: STGame.PLAYER_1,
          cardIndex: 0,
          boundaryMarkerIndex,
          drawFrom: CardTypes.CLAN_CARDS,
        });
        game.endTurn();

        game.playCard({
          playerID: STGame.PLAYER_2,
          cardIndex: 0,
          boundaryMarkerIndex,
          drawFrom: CardTypes.CLAN_CARDS,
        });
        game.endTurn();
      }

      game.claimBoundaryMarker({
        playerID: STGame.PLAYER_1,
        boundaryMarkerIndex: 0,
      });
      game.claimBoundaryMarker({
        playerID: STGame.PLAYER_1,
        boundaryMarkerIndex: 1,
      });
      game.claimBoundaryMarker({
        playerID: STGame.PLAYER_1,
        boundaryMarkerIndex: 2,
      });

      it('Then game status is GAME OVER', () => {
        expect(game.readState().status).toStrictEqual('GAME OVER');
      });

      it('Then 1 is the winner', () => {
        expect(game.readState().winner).toStrictEqual(STGame.PLAYER_1);
      });
    });
  });
});
