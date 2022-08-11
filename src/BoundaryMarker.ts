import { Card, CardDetails } from './Card';
import { CombinationChecker } from './CombinationChecker';
import { PlayerID } from './SchottottenGame';

export type BoundaryMarkerOwner = '1' | '2' | 'NOBODY';
export type BoundaryMarkerState = {
  owner: BoundaryMarkerOwner;
  player1Cards: CardDetails[];
  player2Cards: CardDetails[];
  firstPlayerToComplete?: PlayerID;
};

export class BoundaryMarker {
  private owner: BoundaryMarkerOwner;
  private maximumCardNumber: number;
  private firstPlayerToComplete: PlayerID | undefined;
  private player1Cards: Card[];
  private player2Cards: Card[];

  constructor() {
    this.owner = 'NOBODY';
    this.player1Cards = [];
    this.player2Cards = [];
    this.maximumCardNumber = 3;
  }

  readState(): BoundaryMarkerState {
    return {
      owner: this.owner,
      player1Cards: this.player1Cards.map((card) => card.readCard()),
      player2Cards: this.player2Cards.map((card) => card.readCard()),
      firstPlayerToComplete: this.firstPlayerToComplete,
    };
  }

  addCard(playerId: PlayerID, card: Card): void {
    const playerCards =
      playerId === '1' ? this.player1Cards : this.player2Cards;

    if (playerCards.length >= this.maximumCardNumber) {
      throw new RangeError('BOUNDARY_MARKER_IS_FULL');
    }

    playerCards.push(card);

    const doesPlayerCompleteTheCombination =
      playerCards.length === this.maximumCardNumber;

    const isOtherPlayerNotFinishedYet =
      this.firstPlayerToComplete === undefined;

    if (doesPlayerCompleteTheCombination && isOtherPlayerNotFinishedYet) {
      this.firstPlayerToComplete = playerId;
    }
  }

  claim(): void {
    const isPlayer1SideFull =
      this.player1Cards.length === this.maximumCardNumber;

    const isPlayer2SideFull =
      this.player2Cards.length === this.maximumCardNumber;

    if (!isPlayer1SideFull || !isPlayer2SideFull) {
      throw new RangeError('BOUNDARY_CANNOT_BE_CLAIMED');
    }

    const player1Combination = CombinationChecker.determineCombination(
      this.player1Cards.map((card) => card.readCard()),
    );

    const player2Combination = CombinationChecker.determineCombination(
      this.player2Cards.map((card) => card.readCard()),
    );

    const winner = CombinationChecker.whichCombinationWins(
      player1Combination,
      player2Combination,
    );

    if (!this.firstPlayerToComplete) {
      throw new Error('CLAIM_WITHOUT_COMPLETION');
    }

    if (winner === 'TIE') {
      this.owner = this.firstPlayerToComplete;
      return;
    }

    this.owner = winner;
  }
}
