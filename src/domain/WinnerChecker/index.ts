import { BoundaryMarker } from '../BoundaryMarker';
import { PlayerID, STGame } from '../SchottenTottenGame';

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
          if (markerState.owner === STGame.PLAYER_1) {
            claimsData.player1.claimsCount += 1;

            if (
              claimsData.previousOwner !== STGame.PLAYER_1 &&
              claimsData.player1.consecutiveClaimsCount < 3
            ) {
              claimsData.player1.consecutiveClaimsCount = 0;
            }

            claimsData.player1.consecutiveClaimsCount += 1;
          }

          if (markerState.owner === STGame.PLAYER_2) {
            claimsData.player2.claimsCount += 1;

            if (
              claimsData.previousOwner !== STGame.PLAYER_2 &&
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
      return STGame.PLAYER_1;
    }

    if (
      claimsData.player2.consecutiveClaimsCount >= 3 ||
      claimsData.player2.claimsCount >= 5
    ) {
      return STGame.PLAYER_2;
    }

    return 'NOBODY';
  }
}
