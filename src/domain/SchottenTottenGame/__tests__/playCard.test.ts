import { CardTypes, STGame, DomainError } from '../../';

describe('Component SchottenTottenGame.playCard()', () => {
  describe('Given a Game that just started', () => {
    describe('When player 1 plays a card', () => {
      const game = new STGame('John', 'Sarah', {});
      game.startGame();

      game.playCard({
        playerID: STGame.PLAYER_1,
        boundaryMarkerIndex: 0,
        cardIndex: 0,
        drawFrom: CardTypes.CLAN_CARDS,
      });

      it('Then the card is played on the boundary marker 0', () => {
        expect(
          game.readState().boundaryMarkers[0].player1Cards.length,
        ).toStrictEqual(1);
      });

      it('Then it is still player 1 turn in case he want to claim', () => {
        expect(game.readState().currentPlayerID).toStrictEqual(STGame.PLAYER_1);
      });
    });

    describe('When player 2 tries plays a card during player 1 turn', () => {
      const game = new STGame('John', 'Sarah', {});
      game.startGame();

      let error;

      try {
        game.playCard({
          playerID: STGame.PLAYER_2,
          boundaryMarkerIndex: 0,
          cardIndex: 0,
          drawFrom: CardTypes.CLAN_CARDS,
        });
      } catch (err: unknown) {
        if (err instanceof DomainError) {
          expect(err.code).toStrictEqual('NOT_YOUR_TURN');
          expect(err.name).toStrictEqual('DOMAIN_ERROR');
          expect(err.message).toStrictEqual(`It's not your turn to play`);
        }

        error = err;
      }

      expect(error).toBeInstanceOf(DomainError);
    });
  });

  describe('Given a Game and player 1 just played and not end his turn', () => {
    const game = new STGame('John', 'Sarah', {});
    game.startGame();

    game.playCard({
      playerID: STGame.PLAYER_1,
      boundaryMarkerIndex: 0,
      cardIndex: 0,
      drawFrom: CardTypes.CLAN_CARDS,
    });

    describe('When player 1 tries to plays again', () => {
      it('Then it throws a CARD_PLAYED_ALREADY error', () => {
        let error;
        try {
          game.playCard({
            playerID: STGame.PLAYER_1,
            boundaryMarkerIndex: 0,
            cardIndex: 0,
            drawFrom: CardTypes.CLAN_CARDS,
          });
        } catch (err: unknown) {
          if (err instanceof DomainError) {
            expect(err.code).toStrictEqual('CARD_PLAYED_ALREADY');
            expect(err.name).toStrictEqual('DOMAIN_ERROR');
            expect(err.message).toStrictEqual(
              'Player already played a card for this turn',
            );
          }

          error = err;
        }

        expect(error).toBeInstanceOf(DomainError);
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
            drawFrom: CardTypes.CLAN_CARDS,
          });
        } catch (err: unknown) {
          if (err instanceof DomainError) {
            expect(err.code).toStrictEqual('INVALID_BOUNDARY_ID');
            expect(err.name).toStrictEqual('DOMAIN_ERROR');
            expect(err.message).toStrictEqual('This boundary id is invalid');
          }

          error = err;
        }

        expect(error).toBeInstanceOf(DomainError);
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
            drawFrom: CardTypes.CLAN_CARDS,
          });
        } catch (err: unknown) {
          if (err instanceof DomainError) {
            expect(err.code).toStrictEqual('INVALID_CARD_INDEX');
            expect(err.name).toStrictEqual('DOMAIN_ERROR');
            expect(err.message).toStrictEqual('This card index is invalid');
          }

          error = err;
        }

        expect(error).toBeInstanceOf(DomainError);
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
      drawFrom: CardTypes.CLAN_CARDS,
    });
    game.endTurn();

    game.playCard({
      playerID: STGame.PLAYER_2,
      boundaryMarkerIndex: 0,
      cardIndex: 0,
      drawFrom: CardTypes.CLAN_CARDS,
    });
    game.endTurn();

    game.playCard({
      playerID: STGame.PLAYER_1,
      boundaryMarkerIndex: 0,
      cardIndex: 0,
      drawFrom: CardTypes.CLAN_CARDS,
    });
    game.endTurn();

    game.playCard({
      playerID: STGame.PLAYER_2,
      boundaryMarkerIndex: 0,
      cardIndex: 0,
      drawFrom: CardTypes.CLAN_CARDS,
    });
    game.endTurn();

    game.playCard({
      playerID: STGame.PLAYER_1,
      boundaryMarkerIndex: 0,
      cardIndex: 0,
      drawFrom: CardTypes.CLAN_CARDS,
    });
    game.endTurn();

    game.playCard({
      playerID: STGame.PLAYER_2,
      boundaryMarkerIndex: 0,
      cardIndex: 0,
      drawFrom: CardTypes.CLAN_CARDS,
    });
    game.endTurn();

    describe('When player 1 tries to plays on that boundary', () => {
      it('Then it throws a BOUNDARY_MARKER_IS_FULL error', () => {
        let error;
        try {
          game.playCard({
            playerID: STGame.PLAYER_1,
            boundaryMarkerIndex: 0,
            cardIndex: 0,
            drawFrom: CardTypes.CLAN_CARDS,
          });
        } catch (err: any) {
          if (err instanceof DomainError) {
            expect(err.code).toStrictEqual('BOUNDARY_MARKER_IS_FULL');
            expect(err.name).toStrictEqual('DOMAIN_ERROR');
            expect(err.message).toStrictEqual(
              `This boundary marker is full already`,
            );
          }

          error = err;
        }

        expect(error).toBeInstanceOf(DomainError);
      });
    });
  });
});
