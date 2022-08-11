import { Card, CardColor, cardColors } from '../Card';

describe('Component: Card', () => {
  const testValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  describe.each(testValues)('Given value equals %d', (value: number) => {
    describe.each(cardColors)('And color equals %s', (color: CardColor) => {
      describe('When I create a new Card', () => {
        const card = new Card(value, color);

        it('Then it should return a Card instance', () => {
          expect(card).toBeInstanceOf(Card);
        });

        it(`And card details should be value: ${value}, color: ${color}`, () => {
          expect(card.readCard()).toStrictEqual({
            value,
            color,
          });
        });
      });
    });
  });

  describe('Given an invalid value: 10', () => {
    const invalidValue = 10;

    describe('And a valid color: blue', () => {
      const validColor = 'blue';

      describe('When I create a new Card', () => {
        it('Then it should throw ', () => {
          let error;

          try {
            new Card(invalidValue, validColor);
          } catch (err: any) {
            error = err;
          }
          expect(error.message).toStrictEqual('INVALID_CARD_VALUE');
        });
      });
    });
  });

  describe('Given an valid value: 8', () => {
    const validValue = 8;

    describe('And an invalid color: black', () => {
      const invalidColor = 'black';

      describe('When I create a new Card', () => {
        it('Then it should throw ', () => {
          let error;

          try {
            // @ts-expect-error
            new Card(validValue, invalidColor);
          } catch (err: any) {
            error = err;
          }
          expect(error.message).toStrictEqual('INVALID_CARD_COLOR');
        });
      });
    });
  });
});
