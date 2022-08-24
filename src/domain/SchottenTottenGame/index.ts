import {
  BoundaryMarker,
  BoundaryMarkerIds,
  BoundaryMarkerState,
} from '../BoundaryMarker';
import { Card } from '../Card';
import { CardDeck as CardDeck } from '../CardDeck';
import { GameId, UuidGameId } from '../GameId';
import { Player, PlayerState } from '../Player';
import { WinnerChecker } from '../WinnerChecker';

const boundaryMarkersIds: BoundaryMarkerIds[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
];

export type PlayerID = '1' | '2';

export type GameStatus = 'INITIATED' | 'STARTED' | 'GAME OVER';

export type GameState = {
  gameId: GameId;
  player1: PlayerState;
  player2: PlayerState;
  boundaryMarkers: BoundaryMarkerState[];
  currentPlayerID: PlayerID;
  winner: PlayerID | 'NOBODY';
  status: GameStatus;
};

export class STGame {
  static PLAYER_1: PlayerID = '1';
  static PLAYER_2: PlayerID = '2';

  private gameId: GameId;
  private playerMaxCardInHands: number;
  private player1: Player;
  private player2: Player;
  private cardDeck: CardDeck;
  private boundaryMarkers: BoundaryMarker[];
  private currentPlayerID: PlayerID;
  private isCardPlayed: boolean;
  private winner: PlayerID | 'NOBODY';
  private status: GameStatus;

  constructor(player1Name: string, player2Name: string, options?: any) {
    this.gameId = new UuidGameId();
    this.winner = 'NOBODY';
    this.playerMaxCardInHands = 6;
    this.boundaryMarkers = [];
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
    this.cardDeck = new CardDeck();
    this.currentPlayerID = STGame.PLAYER_1;
    this.status = 'INITIATED';
    this.isCardPlayed = false;

    boundaryMarkersIds.forEach((id) => {
      this.boundaryMarkers.push(new BoundaryMarker(id));
    });
  }

  shuffleDecks(): void {
    if (this.status !== 'INITIATED') {
      return;
    }

    this.cardDeck.shuffleDeck();
  }

  startGame(): void {
    if (this.status !== 'INITIATED') {
      return;
    }

    for (let i = 0; i < this.playerMaxCardInHands; i++) {
      const card1 = this.cardDeck.drawClanCard();
      const card2 = this.cardDeck.drawClanCard();

      if (!card1 || !card2) {
        throw new RangeError('NOT_ENOUGH_CARD_IN_THE_CLAN_PILE');
      }

      this.player1.receiveCard(card1);
      this.player2.receiveCard(card2);
    }

    this.status = 'STARTED';
  }

  playCard(params: {
    playerID: PlayerID;
    cardIndex: number;
    boundaryMarkerIndex: number;
    drawFrom: 'CLAN_CARDS' | 'TACTICAL_CARD';
  }): void {
    const { boundaryMarkerIndex, cardIndex, playerID, drawFrom } = params;

    if (this.status !== 'STARTED') {
      throw new RangeError('GAME_NOT_STARTED_OR_OVER');
    }

    if (!this.isItPlayerTurn(playerID)) {
      throw new RangeError('NOT_YOUR_TURN');
    }

    if (this.isCardPlayed) {
      throw new RangeError('CARD_PLAYED_ALREADY');
    }

    if (!this.isboundaryMarkerIndexValid(boundaryMarkerIndex)) {
      throw new RangeError('INVALID_BOUNDARY_ID');
    }

    if (!this.isPlayerCardIndexValid(cardIndex)) {
      throw new RangeError('INVALID_CARD_INDEX');
    }

    const player = playerID === STGame.PLAYER_1 ? this.player1 : this.player2;
    const card = player.playCard(cardIndex);

    try {
      this.boundaryMarkers[boundaryMarkerIndex].addCard(playerID, card);
    } catch (err: any) {
      if (err.message === 'BOUNDARY_MARKER_IS_FULL') {
        player.receiveCard(card);
      }

      throw err;
    }

    let newCard: Card | undefined;

    if (drawFrom === 'CLAN_CARDS') {
      newCard = this.cardDeck.drawClanCard();

      if (!newCard) {
        newCard = this.cardDeck.drawTacticalCard();
      }
    } else {
      newCard = this.cardDeck.drawTacticalCard();

      if (!newCard) {
        newCard = this.cardDeck.drawClanCard();
      }
    }

    if (newCard) {
      player.receiveCard(newCard);
    }

    this.isCardPlayed = true;
  }

  endTurn(): void {
    if (!this.isCardPlayed) {
      throw new Error('PLAYER_HAS_NOT_PLAYED');
    }

    this.currentPlayerID =
      this.currentPlayerID === STGame.PLAYER_1
        ? STGame.PLAYER_2
        : STGame.PLAYER_1;
    this.isCardPlayed = false;
  }

  claimBoundaryMarker(params: {
    playerID: PlayerID;
    boundaryMarkerIndex: number;
  }): void {
    const { boundaryMarkerIndex, playerID } = params;

    if (!this.isItPlayerTurn(playerID)) {
      throw new RangeError('NOT_YOUR_TURN');
    }

    if (this.winner !== 'NOBODY') {
      throw new RangeError('GAME_OVER');
    }

    if (!this.isboundaryMarkerIndexValid(boundaryMarkerIndex)) {
      throw new RangeError('INVALID_BOUNDARY_ID');
    }

    this.boundaryMarkers[boundaryMarkerIndex].claim();

    const winner = this.isThereAWinner();

    this.winner = winner;
    this.status = 'GAME OVER';
  }

  readState(): GameState {
    return {
      gameId: this.gameId,
      player1: this.player1.readState(),
      player2: this.player2.readState(),
      boundaryMarkers: this.boundaryMarkers.map((bm) => bm.readState()),
      currentPlayerID: this.currentPlayerID,
      winner: this.winner,
      status: this.status,
    };
  }

  // @TODO un-comment when tactical cards are implemented.

  // pass(playerID: PlayerID): void {
  //   if (!this.isItPlayerTurn(playerID)) {
  //     throw new RangeError('NOT_YOUR_TURN');
  //   }

  //   const playerCompletedAllMarkers =
  //     this.isPlayerCompletedAllMarkers(playerID);
  //   const playerHasOnlyTacticalCards = false; // isPlayerHasOnlyTacticalCards(playerID);

  //   if (!playerCompletedAllMarkers || !playerHasOnlyTacticalCards) {
  //     throw new RangeError('PLAYER_CANNOT_PASS');
  //   }

  //   this.currentPlayerID = this.currentPlayerID === '1' ? '2' : '1';
  // }

  private isItPlayerTurn(playerID: PlayerID): boolean {
    return this.currentPlayerID === playerID ? true : false;
  }

  private isboundaryMarkerIndexValid(boundaryMarkerIndex: number): boolean {
    return (
      boundaryMarkerIndex < this.boundaryMarkers.length &&
      boundaryMarkerIndex >= 0
    );
  }

  private isPlayerCardIndexValid(cardIndex: number): boolean {
    return cardIndex < this.playerMaxCardInHands && cardIndex >= 0;
  }

  // @TODO un-comment when tactical cards are implemented.
  // private isPlayerCompletedAllMarkers(playerID: PlayerID): boolean {
  //   return this.boundaryMarkers
  //     .map((marker) => marker.readState())
  //     .every((markerState) => {
  //       const playerCards =
  //         playerID === '1'
  //           ? markerState.player1Cards
  //           : markerState.player2Cards;
  //       playerCards.length === markerState.maximumCardNumber;
  //     });
  // }

  // @TODO un-comment when tactical cards are implemented.
  // private isPlayerHasOnlyTacticalCards(): boolean {
  //   return false;
  // }

  private isThereAWinner(): PlayerID | 'NOBODY' {
    return WinnerChecker.isThereAWinner(this.boundaryMarkers);
  }
}
