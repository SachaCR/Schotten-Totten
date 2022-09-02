import { Card, CardDetails } from '../Card';
import { CombinationChecker } from '../CombinationChecker';
import {
  BoundaryCannotBeClaimedError,
  BoundaryMarkerIsFullError,
} from '../errors';
import { PlayerID, STGame } from '../SchottenTottenGame';

export type BoundaryMarkerOwner = PlayerID.ONE | PlayerID.TWO | 'NOBODY';
export type BoundaryMarkerIds =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I';

export type BoundaryMarkerState = {
  owner: BoundaryMarkerOwner;
  player1Cards: CardDetails[];
  player2Cards: CardDetails[];
  firstPlayerToComplete?: PlayerID;
  maximumCardNumber: number;
  id: BoundaryMarkerIds;
};

export class BoundaryMarker {
  private owner: BoundaryMarkerOwner;
  private maximumCardNumber: number;
  private firstPlayerToComplete: PlayerID | undefined;
  private player1Cards: Card[];
  private player2Cards: Card[];
  private id: BoundaryMarkerIds;

  constructor(id: BoundaryMarkerIds) {
    this.owner = 'NOBODY';
    this.player1Cards = [];
    this.player2Cards = [];
    this.maximumCardNumber = 3;
    this.id = id;
  }

  readState(): BoundaryMarkerState {
    return {
      id: this.id,
      owner: this.owner,
      player1Cards: this.player1Cards.map((card) => card.readCard()),
      player2Cards: this.player2Cards.map((card) => card.readCard()),
      firstPlayerToComplete: this.firstPlayerToComplete,
      maximumCardNumber: this.maximumCardNumber,
    };
  }

  addCard(playerId: PlayerID, card: Card): void {
    const playerCards =
      playerId === STGame.PLAYER_1 ? this.player1Cards : this.player2Cards;

    if (playerCards.length >= this.maximumCardNumber) {
      throw new BoundaryMarkerIsFullError();
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

    if (
      !isPlayer1SideFull ||
      !isPlayer2SideFull ||
      !this.firstPlayerToComplete
    ) {
      throw new BoundaryCannotBeClaimedError();
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

    if (winner === 'TIE') {
      this.owner = this.firstPlayerToComplete;
      return;
    }

    this.owner = winner;
  }
}
