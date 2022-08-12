import { STGame } from '../../SchottenTottenGame';

describe('Component SchottenTottenGame.claim()', () => {
  describe('Given a Game', () => {
    const game = new STGame('John', 'Sarah', {});

    describe('With current is player 1', () => {
      describe('When player 1 tries to claim a uncompleted boundary marker', () => {
        it('Then it throws a BOUNDARY_CANNOT_BE_CLAIMED error', () => {
          let error;

          try {
            game.claimBoundaryMarker({
              boundaryMarkerIndex: 0,
              playerID: STGame.PLAYER_1,
            });
          } catch (err: any) {
            error = err;
          }

          expect(error.message).toStrictEqual('BOUNDARY_CANNOT_BE_CLAIMED');
        });
      });
    });
  });

  describe('Given a Game', () => {
    const game = new STGame('John', 'Sarah', {});
    describe('With current is player 1', () => {
      describe('When player 2 tries to claim a uncompleted boundary marker', () => {
        it('Then it throws a NOT_YOUR_TURN error', () => {
          let error;

          try {
            game.claimBoundaryMarker({
              boundaryMarkerIndex: 0,
              playerID: STGame.PLAYER_2,
            });
          } catch (err: any) {
            error = err;
          }

          expect(error.message).toStrictEqual('NOT_YOUR_TURN');
        });
      });
    });
  });

  describe('Given a Game', () => {
    const game = new STGame('John', 'Sarah', {});
    describe('With current is player 1', () => {
      describe('When player 1 tries to claim a an invalid boundary marker', () => {
        it('Then it throws a INVALID_BOUNDARY_ID error', () => {
          let error;

          try {
            game.claimBoundaryMarker({
              boundaryMarkerIndex: 11,
              playerID: STGame.PLAYER_1,
            });
          } catch (err: any) {
            error = err;
          }

          expect(error.message).toStrictEqual('INVALID_BOUNDARY_ID');
        });
      });
    });
  });
});
