import { BoundaryMarker } from '../';

describe('Component BoundaryMarker', () => {
  describe('Given I want to create a BoundaryMarker', () => {
    describe('When I create a new instance', () => {
      const boundaryMarker = new BoundaryMarker();

      it('Then the owner is NOBODY', () => {
        expect(boundaryMarker.readState().owner).toStrictEqual('NOBODY');
      });

      it('Then player 1 cards are empty', () => {
        expect(boundaryMarker.readState().player1Cards).toStrictEqual([]);
      });

      it('Then player 2 cards are empty', () => {
        expect(boundaryMarker.readState().player2Cards).toStrictEqual([]);
      });

      it('Then firstPlayerToComplete is undefined', () => {
        expect(
          boundaryMarker.readState().firstPlayerToComplete,
        ).toBeUndefined();
      });

      it('Then the maximum card number is 3', () => {
        expect(boundaryMarker.readState().maximumCardNumber).toStrictEqual(3);
      });
    });
  });
});
