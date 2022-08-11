import { BoundaryMarker } from './BoundaryMarker';
import { PlayerID } from './SchottottenGame';

type ClaimData = {
  player1: {
    consecutiveClaimsCount: number;
    claimsCount: number;
  };
  player2: {
    consecutiveClaimsCount: number;
    claimsCount: number;
  };
  previousOwner?: PlayerID | 'NOBODY';
};

export class WinnerChecker {
  static isThereAWinner(markers: BoundaryMarker[]): PlayerID | 'NOBODY' {
    const claimsData = markers
      .map((marker) => marker.readState())
      .reduce(
        (claimsData: ClaimData, markerState): ClaimData => {
          if (markerState.owner === '1') {
            claimsData.player1.claimsCount += 1;

            if (
              claimsData.previousOwner !== '1' &&
              claimsData.player1.consecutiveClaimsCount < 3
            ) {
              claimsData.player1.consecutiveClaimsCount = 0;
            }

            claimsData.player1.consecutiveClaimsCount += 1;
          }

          if (markerState.owner === '2') {
            claimsData.player2.claimsCount += 1;

            if (
              claimsData.previousOwner !== '2' &&
              claimsData.player2.consecutiveClaimsCount < 3
            ) {
              claimsData.player2.consecutiveClaimsCount = 0;
            }

            claimsData.player2.consecutiveClaimsCount += 1;
          }

          claimsData.previousOwner = markerState.owner;

          return claimsData;
        },
        {
          player1: {
            consecutiveClaimsCount: 0,
            claimsCount: 0,
          },
          player2: {
            consecutiveClaimsCount: 0,
            claimsCount: 0,
          },
        },
      );

    if (
      claimsData.player1.consecutiveClaimsCount >= 3 ||
      claimsData.player1.claimsCount >= 5
    ) {
      return '1';
    }

    if (
      claimsData.player2.consecutiveClaimsCount >= 3 ||
      claimsData.player2.claimsCount >= 5
    ) {
      return '2';
    }

    return 'NOBODY';
  }
}
