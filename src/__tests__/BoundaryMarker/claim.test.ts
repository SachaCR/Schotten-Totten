import { BoundaryMarker } from '../../BoundaryMarker';
import { Card } from '../../Card';
import { STGame } from '../../SchottenTottenGame';

describe('Component BoundaryMarker.claim()', () => {
  describe('Given an empty BoundaryMarker', () => {
    const boundaryMarker = new BoundaryMarker();

    describe('When there is a claim', () => {
      it('Then it throws an error', () => {
        let error;
        try {
          boundaryMarker.claim();
        } catch (err: any) {
          error = err;
        }

        expect(error.message).toStrictEqual('BOUNDARY_CANNOT_BE_CLAIMED');
      });
    });
  });

  describe('Given a full BoundaryMarker', () => {
    const boundaryMarker = new BoundaryMarker();
    describe('With a color suite for player 1', () => {
      boundaryMarker.addCard(STGame.PLAYER_1, new Card(1, 'blue'));
      boundaryMarker.addCard(STGame.PLAYER_1, new Card(2, 'blue'));
      boundaryMarker.addCard(STGame.PLAYER_1, new Card(3, 'blue'));

      describe('And a sum for player 2', () => {
        boundaryMarker.addCard(STGame.PLAYER_2, new Card(1, 'blue'));
        boundaryMarker.addCard(STGame.PLAYER_2, new Card(2, 'green'));
        boundaryMarker.addCard(STGame.PLAYER_2, new Card(3, 'blue'));

        describe('When there is a claim', () => {
          boundaryMarker.claim();

          it('Then player 1 wins the boundary marker', () => {
            expect(boundaryMarker.readState().owner).toStrictEqual('1');
          });
        });
      });
    });
  });

  describe('Given a full BoundaryMarker', () => {
    const boundaryMarker = new BoundaryMarker();
    describe('With a color suite for player 1', () => {
      boundaryMarker.addCard(STGame.PLAYER_1, new Card(1, 'blue'));
      boundaryMarker.addCard(STGame.PLAYER_1, new Card(2, 'blue'));
      boundaryMarker.addCard(STGame.PLAYER_1, new Card(3, 'blue'));

      describe('And same color suite for player 2', () => {
        boundaryMarker.addCard(STGame.PLAYER_2, new Card(1, 'green'));
        boundaryMarker.addCard(STGame.PLAYER_2, new Card(2, 'green'));
        boundaryMarker.addCard(STGame.PLAYER_2, new Card(3, 'green'));

        describe('When there is a claim on a tie', () => {
          boundaryMarker.claim();

          it('Then player 1 wins the boundary marker because he was first to complete', () => {
            expect(
              boundaryMarker.readState().firstPlayerToComplete,
            ).toStrictEqual(STGame.PLAYER_1);

            expect(boundaryMarker.readState().owner).toStrictEqual(
              STGame.PLAYER_1,
            );
          });
        });
      });
    });
  });
});
