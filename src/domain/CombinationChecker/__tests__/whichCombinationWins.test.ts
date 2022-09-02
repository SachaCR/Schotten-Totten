import { CombinationChecker, CombinationDetails } from '../';
import { DomainError } from '../../Errors';

describe('Component CombinationChecker.whichCombinationWins()', () => {
  const combination1Wins: CombinationDetails[][] = [
    [
      { name: 'suite', value: 6 },
      { name: 'sum', value: 10 },
    ],
    [
      { name: 'color', value: 10 },
      { name: 'suite', value: 6 },
    ],
    [
      { name: 'brelan', value: 9 },
      { name: 'color', value: 10 },
    ],
    [
      { name: 'color suite', value: 6 },
      { name: 'brelan', value: 9 },
    ],
  ];

  describe.each(combination1Wins)(
    'Given two combinations',
    (combination1, combination2) => {
      describe(`When I check ${combination1.name} against ${combination2.name}`, () => {
        const result = CombinationChecker.whichCombinationWins(
          combination1,
          combination2,
        );

        it('Then it returns combination 1', () => {
          expect(result).toStrictEqual('1');
        });
      });
    },
  );

  const combination2Wins: CombinationDetails[][] = [
    [
      { name: 'sum', value: 10 },
      { name: 'suite', value: 6 },
    ],
    [
      { name: 'suite', value: 6 },
      { name: 'color', value: 10 },
    ],
    [
      { name: 'color', value: 10 },
      { name: 'brelan', value: 9 },
    ],
    [
      { name: 'brelan', value: 9 },
      { name: 'color suite', value: 6 },
    ],
  ];

  describe.each(combination2Wins)(
    'Given two combinations',
    (combination1, combination2) => {
      describe(`When I check ${combination1.name} against ${combination2.name}`, () => {
        const result = CombinationChecker.whichCombinationWins(
          combination1,
          combination2,
        );

        it('Then it returns combination 2', () => {
          expect(result).toStrictEqual('2');
        });
      });
    },
  );

  describe('Given two combinations', () => {
    const combination1: CombinationDetails = {
      name: 'brelan',
      value: 6,
    };

    const combination2: CombinationDetails = {
      name: 'brelan',
      value: 9,
    };

    describe(`When the combination are the same`, () => {
      const result = CombinationChecker.whichCombinationWins(
        combination1,
        combination2,
      );

      it('Then the one with the highest sum wins', () => {
        expect(result).toStrictEqual('2');
      });
    });
  });

  describe('Given two combinations', () => {
    const combination1: CombinationDetails = {
      name: 'suite',
      value: 9,
    };

    const combination2: CombinationDetails = {
      name: 'suite',
      value: 6,
    };

    describe(`When the combination are the same`, () => {
      const result = CombinationChecker.whichCombinationWins(
        combination1,
        combination2,
      );

      it('Then the one with the highest sum wins', () => {
        expect(result).toStrictEqual('1');
      });
    });
  });

  describe('Given two combinations', () => {
    const combination1: CombinationDetails = {
      name: 'suite',
      value: 9,
    };

    const combination2: CombinationDetails = {
      name: 'suite',
      value: 9,
    };

    describe(`When the combination are the same`, () => {
      const result = CombinationChecker.whichCombinationWins(
        combination1,
        combination2,
      );

      describe(`And values are equal`, () => {
        it('Then it retuns a tie', () => {
          expect(result).toStrictEqual('TIE');
        });
      });
    });
  });

  describe('Given two combinations', () => {
    const combination1: CombinationDetails = {
      // @ts-expect-error
      name: 'invalid combination name',
      value: 9,
    };

    const combination2: CombinationDetails = {
      name: 'suite',
      value: 9,
    };

    describe(`When one of them is unknown`, () => {
      it('Then it throws a COMBINATION_RANK_NOT_FOUND error', () => {
        let error;
        try {
          CombinationChecker.whichCombinationWins(combination1, combination2);
        } catch (err: unknown) {
          if (err instanceof DomainError) {
            expect(err.code).toStrictEqual('COMBINATION_RANK_NOT_FOUND');
            expect(err.name).toStrictEqual('DOMAIN_ERROR');
            expect(err.message).toStrictEqual(
              'There is no combination rank for this combination',
            );
          }

          error = err;
        }

        expect(error).toBeInstanceOf(DomainError);
      });
    });
  });
});
