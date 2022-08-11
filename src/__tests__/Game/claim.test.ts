import { SchottottenGame } from '../../SchottottenGame';

describe('Component SchottottenGame.claim()', () => {
  describe('Given a Game', () => {
    const game = new SchottottenGame('John', 'Sarah', {});

    describe('With current is player 1', () => {
      describe('When player 1 tries to claim a uncompleted boundary marker', () => {
        it('Then it throws a BOUNDARY_CANNOT_BE_CLAIMED error', () => {
          let error;

          try {
            game.claimBoundaryMarker({
              boundaryMarkerIndex: 0,
              playerID: '1',
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
    const game = new SchottottenGame('John', 'Sarah', {});
    describe('With current is player 1', () => {
      describe('When player 2 tries to claim a uncompleted boundary marker', () => {
        it('Then it throws a NOT_YOUR_TURN error', () => {
          let error;

          try {
            game.claimBoundaryMarker({
              boundaryMarkerIndex: 0,
              playerID: '2',
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
    const game = new SchottottenGame('John', 'Sarah', {});
    describe('With current is player 1', () => {
      describe('When player 1 tries to claim a an invalid boundary marker', () => {
        it('Then it throws a INVALID_BOUNDARY_ID error', () => {
          let error;

          try {
            game.claimBoundaryMarker({
              boundaryMarkerIndex: 11,
              playerID: '1',
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
