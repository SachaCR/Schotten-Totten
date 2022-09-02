import { STGame } from '../';
import { DomainError } from '../../Errors';

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
            if (err instanceof DomainError) {
              expect(err.code).toStrictEqual('BOUNDARY_CANNOT_BE_CLAIMED');
              expect(err.name).toStrictEqual('DOMAIN_ERROR');
              expect(err.message).toStrictEqual(
                'This boundary marker cannot be claimed',
              );
            }

            error = err;
          }

          expect(error).toBeInstanceOf(DomainError);
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
  });
});
