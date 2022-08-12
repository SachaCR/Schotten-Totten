import { CombinationChecker } from '../';
import { CardDetails } from '../../Card';

describe('Component CombinationChecker.determineCombination()', () => {
  describe('Given I have a 1 blue, 4 green, 5 yellow', () => {
    const cardDetails: CardDetails[] = [
      {
        value: 1,
        color: 'blue',
      },
      {
        value: 4,
        color: 'green',
      },
      {
        value: 5,
        color: 'yellow',
      },
    ];

    describe('When I determine the combination', () => {
      const combination = CombinationChecker.determineCombination(cardDetails);
      it('Then it return a sum with value 10', () => {
        expect(combination).toStrictEqual({
          name: 'sum',
          value: 10,
        });
      });
    });
  });

  describe('Given I have a 3 blue, 1 green, 2 yellow', () => {
    const cardDetails: CardDetails[] = [
      {
        value: 3,
        color: 'blue',
      },
      {
        value: 1,
        color: 'green',
      },
      {
        value: 2,
        color: 'yellow',
      },
    ];

    describe('When I determine the combination', () => {
      const combination = CombinationChecker.determineCombination(cardDetails);
      it('Then it return a suite with value 6', () => {
        expect(combination).toStrictEqual({
          name: 'suite',
          value: 6,
        });
      });
    });
  });

  describe('Given I have a 8 blue, 2 blue, 4 blue', () => {
    const cardDetails: CardDetails[] = [
      {
        value: 8,
        color: 'blue',
      },
      {
        value: 2,
        color: 'blue',
      },
      {
        value: 4,
        color: 'blue',
      },
    ];

    describe('When I determine the combination', () => {
      const combination = CombinationChecker.determineCombination(cardDetails);
      it('Then it return a color with value 14', () => {
        expect(combination).toStrictEqual({
          name: 'color',
          value: 14,
        });
      });
    });
  });

  describe('Given I have a 2 blue, 2 yellow, 2 green', () => {
    const cardDetails: CardDetails[] = [
      {
        value: 2,
        color: 'blue',
      },
      {
        value: 2,
        color: 'yellow',
      },
      {
        value: 2,
        color: 'green',
      },
    ];

    describe('When I determine the combination', () => {
      const combination = CombinationChecker.determineCombination(cardDetails);
      it('Then it return a brelan with value 6', () => {
        expect(combination).toStrictEqual({
          name: 'brelan',
          value: 6,
        });
      });
    });
  });

  describe('Given I have a 8 blue, 9 blue, 7 blue', () => {
    const cardDetails: CardDetails[] = [
      {
        value: 8,
        color: 'blue',
      },
      {
        value: 9,
        color: 'blue',
      },
      {
        value: 7,
        color: 'blue',
      },
    ];

    describe('When I determine the combination', () => {
      const combination = CombinationChecker.determineCombination(cardDetails);
      it('Then it return a color suite with value 24', () => {
        expect(combination).toStrictEqual({
          name: 'color suite',
          value: 24,
        });
      });
    });
  });
});
