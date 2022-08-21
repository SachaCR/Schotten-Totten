import color from 'ansi-colors';
import { CardDetails, GameState, PlayerID, PlayerState } from '../../domain';

export class GameTextRenderer {
  static cardToString(cardDetails: CardDetails): string {
    switch (cardDetails.color) {
      case 'blue':
        return color.cyan(cardDetails.value.toString());

      case 'brown':
        return color.red(cardDetails.value.toString());

      case 'green':
        return color.green(cardDetails.value.toString());

      case 'orange':
        return color.magenta(cardDetails.value.toString());

      case 'purple':
        return color.blue(cardDetails.value.toString());

      case 'yellow':
        return color.yellow(cardDetails.value.toString());
    }
  }

  static render(gameState: GameState): string {
    const {
      boundaryMarkers,
      currentPlayerID,
      player1,
      player2,
      status,
      winner,
    } = gameState;

    const markersStrings = boundaryMarkers.map((marker, index) => {
      const player1CardStrings = marker.player1Cards.map((card) => {
        return `${this.cardToString(card)}`;
      });

      const player2CardStrings = marker.player2Cards.map((card) => {
        return `${this.cardToString(card)}`;
      });

      return `\t\t${player1CardStrings} \t[ M${
        index + 1
      } ]\t ${player2CardStrings} \n`;
    });

    const currentPlayerCards =
      currentPlayerID === '1' ? player1.cards : player2.cards;

    const currentPlayerCardStrings = currentPlayerCards.map((card) => {
      return `${this.cardToString(card)}`;
    });

    const markerString = markersStrings.reduce((result, line) => {
      return (result += line);
    }, '');

    const playerInfoString = this.playerInfoToString(player1, player2);
    const currentPlayerString = this.currentPlayerToString(currentPlayerID);

    return (
      playerInfoString +
      currentPlayerString +
      '\n' +
      markerString +
      '\n' +
      'Your hand: ' +
      currentPlayerCardStrings
    );
  }

  static markerToString(): string {
    return '';
  }

  static currentPlayerToString(currentPlayerID: PlayerID): string {
    return color.green(
      `┌──────────┐\n│ Current  │\n│ player: ${currentPlayerID}│\n└──────────┘\n`,
    );
  }

  static playerInfoToString(
    player1: PlayerState,
    player2: PlayerState,
  ): string {
    return color.white(
      `\tPlayer 1: ${player1.name} VS Player 2: ${player2.name}\n`,
    );
  }
}

const gameState: GameState = {
  boundaryMarkers: [
    {
      maximumCardNumber: 3,
      owner: 'NOBODY',
      player1Cards: [
        {
          color: 'blue',
          value: 1,
        },
        {
          color: 'purple',
          value: 2,
        },
        {
          color: 'yellow',
          value: 3,
        },
      ],
      player2Cards: [
        {
          color: 'brown',
          value: 3,
        },
        {
          color: 'green',
          value: 4,
        },
        {
          color: 'orange',
          value: 5,
        },
      ],
    },
    {
      maximumCardNumber: 3,
      owner: 'NOBODY',
      player1Cards: [],
      player2Cards: [],
    },
    {
      maximumCardNumber: 3,
      owner: 'NOBODY',
      player1Cards: [],
      player2Cards: [],
    },
    {
      maximumCardNumber: 3,
      owner: 'NOBODY',
      player1Cards: [],
      player2Cards: [],
    },
    {
      maximumCardNumber: 3,
      owner: 'NOBODY',
      player1Cards: [],
      player2Cards: [],
    },
    {
      maximumCardNumber: 3,
      owner: 'NOBODY',
      player1Cards: [],
      player2Cards: [],
    },
    {
      maximumCardNumber: 3,
      owner: 'NOBODY',
      player1Cards: [],
      player2Cards: [],
    },
    {
      maximumCardNumber: 3,
      owner: 'NOBODY',
      player1Cards: [],
      player2Cards: [],
    },
    {
      maximumCardNumber: 3,
      owner: 'NOBODY',
      player1Cards: [],
      player2Cards: [],
    },
  ],
  currentPlayerID: '1',
  player1: {
    cards: [
      {
        color: 'blue',
        value: 8,
      },
      {
        color: 'purple',
        value: 9,
      },
      {
        color: 'yellow',
        value: 7,
      },
    ],
    name: 'Sacha',
  },
  player2: {
    cards: [],
    name: 'John',
  },
  status: 'INITIATED',
  winner: 'NOBODY',
};

console.log(GameTextRenderer.render(gameState));
