import { BoundaryMarker, BoundaryMarkerState } from './BoundaryMarker';
import { Card } from './Card';
import { CardDeck as CardDeck } from './CardDeck';
import { Player, PlayerState } from './Player';
import { WinnerChecker } from './WinnerChecker';

export type PlayerID = '1' | '2';

export type GameState = {
  player1: PlayerState;
  player2: PlayerState;
  boundaryMarkers: BoundaryMarkerState[];
  currentPlayerID: PlayerID;
  winner: PlayerID | 'NOBODY';
};

export class SchottottenGame {
  static PLAYER_1: PlayerID = '1';
  static PLAYER_2: PlayerID = '2';

  private playerMaxCardInHands: number;
  private player1: Player;
  private player2: Player;
  private cardDeck: CardDeck;
  private boundaryMarkers: BoundaryMarker[];
  private currentPlayerID: PlayerID;
  private winner: PlayerID | 'NOBODY';

  constructor(player1Name: string, player2Name: string, options?: any) {
    this.winner = 'NOBODY';
    this.playerMaxCardInHands = 6;
    this.boundaryMarkers = [];
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
    this.cardDeck = new CardDeck();
    this.currentPlayerID = SchottottenGame.PLAYER_1;

    for (let i = 0; i < 9; i++) {
      this.boundaryMarkers.push(new BoundaryMarker());
    }

    this.cardDeck.shuffleDeck();

    for (let i = 0; i < this.playerMaxCardInHands; i++) {
      const card1 = this.cardDeck.drawClanCard();
      const card2 = this.cardDeck.drawClanCard();

      if (!card1 || !card2) {
        throw new RangeError('NOT_ENOUGH_CARD_IN_THE_CLAN_PILE');
      }

      this.player1.receiveCard(card1);
      this.player2.receiveCard(card2);
    }
  }

  playCard(params: {
    playerID: PlayerID;
    cardIndex: number;
    boundaryMarkerIndex: number;
    drawFrom: 'CLAN_CARDS' | 'TACTICAL_CARD';
  }): void {
    const { boundaryMarkerIndex, cardIndex, playerID, drawFrom } = params;

    if (!this.isItPlayerTurn(playerID)) {
      throw new RangeError('NOT_YOUR_TURN');
    }

    if (!this.isboundaryMarkerIndexValid(boundaryMarkerIndex)) {
      throw new RangeError('INVALID_BOUNDARY_ID');
    }

    if (!this.isPlayerCardIndexValid(cardIndex)) {
      throw new RangeError('INVALID_CARD_INDEX');
    }

    const player = playerID === '1' ? this.player1 : this.player2;
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

    this.currentPlayerID = this.currentPlayerID === '1' ? '2' : '1';
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
  }

  readState(): GameState {
    return {
      player1: this.player1.readState(),
      player2: this.player2.readState(),
      boundaryMarkers: this.boundaryMarkers.map((bm) => bm.readState()),
      currentPlayerID: this.currentPlayerID,
      winner: this.winner,
    };
  }

  pass(playerID: PlayerID): void {
    if (!this.isItPlayerTurn(playerID)) {
      throw new RangeError('NOT_YOUR_TURN');
    }

    // TODO Verify player can pass
    // isAllBoundaryMarker full on his side
    // noMoreClanCardInHand
    //

    this.currentPlayerID = this.currentPlayerID === '1' ? '2' : '1';
  }

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

  private isThereAWinner(): PlayerID | 'NOBODY' {
    return WinnerChecker.isThereAWinner(this.boundaryMarkers);
  }
}
