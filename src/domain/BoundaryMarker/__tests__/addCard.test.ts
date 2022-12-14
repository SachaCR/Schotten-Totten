import { BoundaryMarker } from '../';
import { Card } from '../../Card';
import { DomainError } from '../../domainError';
import { PlayerID, STGame } from '../../SchottenTottenGame';

describe('Component BoundaryMarker.addCard()', () => {
  describe('Given an empty BoundaryMarker', () => {
    describe('When player 1 adds a card', () => {
      const boundaryMarker = new BoundaryMarker('A');
      boundaryMarker.addCard(PlayerID.ONE, new Card(1, 'blue'));

      it('Then player 1 cards contains the card', () => {
        expect(boundaryMarker.readState().player1Cards).toStrictEqual([
          {
            value: 1,
            color: 'blue',
          },
        ]);
      });

      it('Then player 2 cards are empty', () => {
        expect(boundaryMarker.readState().player2Cards).toStrictEqual([]);
      });
    });
  });

  describe('Given a empty BoundaryMarker', () => {
    describe('When player 2 adds a card', () => {
      const boundaryMarker = new BoundaryMarker('A');
      boundaryMarker.addCard(PlayerID.TWO, new Card(1, 'blue'));

      it('Then player  cards contains the card', () => {
        expect(boundaryMarker.readState().player2Cards).toStrictEqual([
          {
            value: 1,
            color: 'blue',
          },
        ]);
      });

      it('Then player 1 cards are empty', () => {
        expect(boundaryMarker.readState().player1Cards).toStrictEqual([]);
      });
    });
  });

  describe('Given a BoundaryMarker', () => {
    describe('With 2 cards on player 1 side ', () => {
      const boundaryMarker = new BoundaryMarker('A');
      boundaryMarker.addCard(STGame.PLAYER_1, new Card(1, 'blue'));
      boundaryMarker.addCard(STGame.PLAYER_1, new Card(2, 'blue'));

      describe('When player 1 adds a card', () => {
        boundaryMarker.addCard(STGame.PLAYER_1, new Card(3, 'blue'));

        it('Then player 1 cards contains the 3 card', () => {
          expect(boundaryMarker.readState().player1Cards).toStrictEqual([
            {
              value: 1,
              color: 'blue',
            },
            {
              value: 2,
              color: 'blue',
            },
            {
              value: 3,
              color: 'blue',
            },
          ]);
        });

        it('Then player 2 cards are still empty', () => {
          expect(boundaryMarker.readState().player2Cards).toStrictEqual([]);
        });

        it('Then firstPlayerToComplete equals 1', () => {
          expect(
            boundaryMarker.readState().firstPlayerToComplete,
          ).toStrictEqual(STGame.PLAYER_1);
        });
      });
    });
  });

  describe('Given a BoundaryMarker', () => {
    describe('With 3 cards on player 1 side and 2 on player 2 side', () => {
      const boundaryMarker = new BoundaryMarker('A');
      boundaryMarker.addCard(STGame.PLAYER_1, new Card(1, 'blue'));
      boundaryMarker.addCard(STGame.PLAYER_1, new Card(2, 'blue'));
      boundaryMarker.addCard(STGame.PLAYER_1, new Card(3, 'blue'));

      describe('And 2 on player 2 side', () => {
        boundaryMarker.addCard(STGame.PLAYER_2, new Card(2, 'purple'));
        boundaryMarker.addCard(STGame.PLAYER_2, new Card(3, 'purple'));

        describe('When player 2 adds a third card', () => {
          boundaryMarker.addCard(STGame.PLAYER_2, new Card(1, 'purple'));

          it('Then firstPlayerToComplete remains equals 1', () => {
            expect(
              boundaryMarker.readState().firstPlayerToComplete,
            ).toStrictEqual('1');
          });
        });
      });
    });
  });

  describe('Given a BoundaryMarker', () => {
    describe('With 3 cards on player 1 ', () => {
      const boundaryMarker = new BoundaryMarker('A');
      boundaryMarker.addCard(STGame.PLAYER_1, new Card(1, 'blue'));
      boundaryMarker.addCard(STGame.PLAYER_1, new Card(2, 'blue'));
      boundaryMarker.addCard(STGame.PLAYER_1, new Card(3, 'blue'));

      describe('When player 1 tries to add a fourth card', () => {
        it('Then it throw a error', () => {
          let error;

          try {
            boundaryMarker.addCard(STGame.PLAYER_1, new Card(4, 'blue'));
          } catch (err: unknown) {
            if (err instanceof DomainError) {
              expect(err.code).toStrictEqual('BOUNDARY_MARKER_IS_FULL');
              expect(err.name).toStrictEqual('DOMAIN_ERROR');
              expect(err.message).toStrictEqual(
                'This boundary marker is full already',
              );
            }

            error = err;
          }

          expect(error).toBeInstanceOf(DomainError);
        });
      });
    });
  });
});
