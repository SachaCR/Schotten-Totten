import { CardColor, CardDetails } from '../Card';
import { CombinationRankNotFoundError } from '../errors';
import { PlayerID } from '../SchottenTottenGame';

export type CombinationTypes =
  | 'sum'
  | 'suite'
  | 'color'
  | 'brelan'
  | 'color suite';

export type CombinationDetails = {
  name: CombinationTypes;
  value: number;
};

type CombinationData = {
  previousColor?: CardColor;
  previousValue?: number;

  isColorCombination: boolean;
  isSuiteCombination: boolean;
  isBrelan: boolean;

  valueSum: number;
  valueCount: Record<number, number>;
};

const combinationRankMap = new Map<CombinationTypes, number>();

combinationRankMap.set('color suite', 5);
combinationRankMap.set('brelan', 4);
combinationRankMap.set('color', 3);
combinationRankMap.set('suite', 2);
combinationRankMap.set('sum', 1);

export class CombinationChecker {
  static determineCombination(cardsDetails: CardDetails[]): CombinationDetails {
    const brelanLength = cardsDetails.length;

    const combinationData = cardsDetails
      .sort((a, b) => {
        return a.value - b.value;
      })
      .reduce(
        (
          combinationData: CombinationData,
          cardDetail: CardDetails,
        ): CombinationData => {
          if (!combinationData.previousColor) {
            combinationData.previousColor = cardDetail.color;
          }

          if (cardDetail.color !== combinationData.previousColor) {
            combinationData.isColorCombination = false;
          }

          if (!combinationData.previousValue) {
            combinationData.previousValue = cardDetail.value;
          } else if (cardDetail.value - combinationData.previousValue !== 1) {
            combinationData.isSuiteCombination = false;
          }

          if (!combinationData.valueCount[cardDetail.value]) {
            combinationData.valueCount[cardDetail.value] = 1;
          } else {
            combinationData.valueCount[cardDetail.value] += 1;
          }

          if (combinationData.valueCount[cardDetail.value] === brelanLength) {
            combinationData.isBrelan = true;
          }

          combinationData.valueSum += cardDetail.value;
          combinationData.previousValue = cardDetail.value;
          combinationData.previousColor = cardDetail.color;

          return combinationData;
        },
        {
          isColorCombination: true,
          isSuiteCombination: true,
          isBrelan: false,
          valueSum: 0,
          valueCount: {},
        },
      );

    if (
      combinationData.isColorCombination &&
      combinationData.isSuiteCombination
    ) {
      return {
        name: 'color suite',
        value: combinationData.valueSum,
      };
    }

    if (combinationData.isBrelan) {
      return {
        name: 'brelan',
        value: combinationData.valueSum,
      };
    }

    if (combinationData.isColorCombination) {
      return {
        name: 'color',
        value: combinationData.valueSum,
      };
    }

    if (combinationData.isSuiteCombination) {
      return {
        name: 'suite',
        value: combinationData.valueSum,
      };
    }

    return {
      name: 'sum',
      value: combinationData.valueSum,
    };
  }

  static whichCombinationWins(
    combination1: CombinationDetails,
    combination2: CombinationDetails,
  ): PlayerID | 'TIE' {
    const combination1Rank = combinationRankMap.get(combination1.name);
    const combination2Rank = combinationRankMap.get(combination2.name);

    if (!combination1Rank || !combination2Rank) {
      throw new CombinationRankNotFoundError();
    }

    if (combination1Rank > combination2Rank) {
      return PlayerID.ONE;
    }

    if (combination1Rank < combination2Rank) {
      return PlayerID.TWO;
    }

    if (combination1.value > combination2.value) {
      return PlayerID.ONE;
    }

    if (combination1.value < combination2.value) {
      return PlayerID.TWO;
    }

    return 'TIE';
  }
}
