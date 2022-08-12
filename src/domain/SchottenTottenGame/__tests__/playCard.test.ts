import { STGame } from '../';

describe('Component SchottenTottenGame.playCard()', () => {
  describe('Given a Game that just started', () => {
    describe('When player 1 plays a card', () => {
      const game = new STGame('John', 'Sarah', {});
      game.startGame();

      game.playCard({
        playerID: STGame.PLAYER_1,
        boundaryMarkerIndex: 0,
        cardIndex: 0,
        drawFrom: 'CLAN_CARDS',
      });

      it('Then the card is player on the boundary marker 0', () => {
        expect(
          game.readState().boundaryMarkers[0].player1Cards.length,
        ).toStrictEqual(1);
      });

      it('Then next player is player 2', () => {
        expect(game.readState().currentPlayerID).toStrictEqual(STGame.PLAYER_2);
      });
    });
  });

  describe('Given a Game and player 1 just played', () => {
    const game = new STGame('John', 'Sarah', {});
    game.startGame();

    game.playCard({
      playerID: STGame.PLAYER_1,
      boundaryMarkerIndex: 0,
      cardIndex: 0,
      drawFrom: 'CLAN_CARDS',
    });

    describe('When player 1 tries to plays again', () => {
      it('Then it throws a NOT_YOUR_TURN error', () => {
        let error;
        try {
          game.playCard({
            playerID: STGame.PLAYER_1,
            boundaryMarkerIndex: 0,
            cardIndex: 0,
            drawFrom: 'CLAN_CARDS',
          });
        } catch (err: any) {
          error = err;
        }

        expect(error.message).toStrictEqual('NOT_YOUR_TURN');
      });
    });
  });

  describe('Given a Game', () => {
    const game = new STGame('John', 'Sarah', {});
    game.startGame();

    describe('When player 1 tries to plays on an invalid boundary marker', () => {
      it('Then it throws a INVALID_BOUNDARY_ID error', () => {
        let error;
        try {
          game.playCard({
            playerID: STGame.PLAYER_1,
            boundaryMarkerIndex: -1,
            cardIndex: 0,
            drawFrom: 'CLAN_CARDS',
          });
        } catch (err: any) {
          error = err;
        }

        expect(error.message).toStrictEqual('INVALID_BOUNDARY_ID');
      });
    });
  });

  describe('Given a Game', () => {
    const game = new STGame('John', 'Sarah', {});
    game.startGame();

    describe('When player 1 tries to plays on an invalid card index', () => {
      it('Then it throws a INVALID_CARD_INDEX error', () => {
        let error;
        try {
          game.playCard({
            playerID: STGame.PLAYER_1,
            boundaryMarkerIndex: 0,
            cardIndex: -1,
            drawFrom: 'CLAN_CARDS',
          });
        } catch (err: any) {
          error = err;
        }

        expect(error.message).toStrictEqual('INVALID_CARD_INDEX');
      });
    });
  });

  describe('Given a Game with a full boundary marker for player 1', () => {
    const game = new STGame('John', 'Sarah', {});
    game.startGame();

    game.playCard({
      playerID: STGame.PLAYER_1,
      boundaryMarkerIndex: 0,
      cardIndex: 0,
      drawFrom: 'CLAN_CARDS',
    });

    game.playCard({
      playerID: STGame.PLAYER_2,
      boundaryMarkerIndex: 0,
      cardIndex: 0,
      drawFrom: 'CLAN_CARDS',
    });

    game.playCard({
      playerID: STGame.PLAYER_1,
      boundaryMarkerIndex: 0,
      cardIndex: 0,
      drawFrom: 'CLAN_CARDS',
    });

    game.playCard({
      playerID: STGame.PLAYER_2,
      boundaryMarkerIndex: 0,
      cardIndex: 0,
      drawFrom: 'CLAN_CARDS',
    });

    game.playCard({
      playerID: STGame.PLAYER_1,
      boundaryMarkerIndex: 0,
      cardIndex: 0,
      drawFrom: 'CLAN_CARDS',
    });

    game.playCard({
      playerID: STGame.PLAYER_2,
      boundaryMarkerIndex: 0,
      cardIndex: 0,
      drawFrom: 'CLAN_CARDS',
    });

    describe('When player 1 tries to plays on that boundary', () => {
      it('Then it throws a BOUNDARY_MARKER_IS_FULL error', () => {
        let error;
        try {
          game.playCard({
            playerID: STGame.PLAYER_1,
            boundaryMarkerIndex: 0,
            cardIndex: 0,
            drawFrom: 'CLAN_CARDS',
          });
        } catch (err: any) {
          error = err;
        }

        expect(error.message).toStrictEqual('BOUNDARY_MARKER_IS_FULL');
      });
    });
  });
});