// import color from 'ansi-colors';
// import { CardDetails, GameState, PlayerID, PlayerState } from '../../domain';
// import { BoundaryMarkerState } from '../../domain/BoundaryMarker';
// import { UuidGameId } from '../../domain/GameId';

// export class GameTextRenderer {
//   static cardToString(cardDetails: CardDetails): string {
//     switch (cardDetails.color) {
//       case 'blue':
//         return color.cyan(cardDetails.value.toString());

//       case 'brown':
//         return color.red(cardDetails.value.toString());

//       case 'green':
//         return color.green(cardDetails.value.toString());

//       case 'orange':
//         return color.magenta(cardDetails.value.toString());

//       case 'purple':
//         return color.blue(cardDetails.value.toString());

//       case 'yellow':
//         return color.yellow(cardDetails.value.toString());
//     }
//   }

//   static render(gameState: GameState): string {
//     const {
//       boundaryMarkers,
//       currentPlayerID,
//       player1,
//       player2,
//       status,
//       winner,
//     } = gameState;

//     const playerInfoString = this.playerInfoToString(player1, player2);

//     const currentPlayerString = this.currentPlayerToString(currentPlayerID);

//     const markerStrings = boundaryMarkers.map(this.markerToString);
//     const markerString = markerStrings.reduce((result, line) => {
//       return (result += line);
//     }, '');

//     const currentPlayerCards =
//       currentPlayerID === '1' ? player1.cards : player2.cards;

//     const currentPlayerCardStrings = currentPlayerCards.reduce(
//       (resultString, card) => {
//         resultString += `${this.cardToString(card)} `;
//         return resultString;
//       },
//       'Your hand: ',
//     );

//     return (
//       '\n' +
//       playerInfoString +
//       '\n' +
//       currentPlayerString +
//       '\n' +
//       markerString +
//       '\n' +
//       currentPlayerCardStrings +
//       '\n'
//     );
//   }

//   static markerToString(marker: BoundaryMarkerState): string {
//     const player1CardStrings = marker.player1Cards.map((card) => {
//       return `${GameTextRenderer.cardToString(card)}`;
//     });

//     const player2CardStrings = marker.player2Cards.map((card) => {
//       return `${GameTextRenderer.cardToString(card)}`;
//     });

//     let markerString: string;

//     if (marker.owner === '1') {
//       markerString = color.green('<') + `[ ${marker.id} ] `;
//     } else if (marker.owner === '2') {
//       markerString = ` [ ${marker.id} ]` + color.green('>');
//     } else if (marker.firstPlayerToComplete === '1') {
//       markerString = `·[ ${marker.id} ] `;
//     } else if (marker.firstPlayerToComplete === '2') {
//       markerString = ` [ ${marker.id} ]·`;
//     } else {
//       markerString = ` [ ${marker.id} ] `;
//     }

//     return `\t\t${player1CardStrings}\t${markerString}\t  ${player2CardStrings}\n`;
//   }

//   static currentPlayerToString(currentPlayerID: PlayerID): string {
//     return color.green(
//       `┌──────────┐\n│ Current  │\n│ player: ${currentPlayerID}│\n└──────────┘\n`,
//     );
//   }

//   static playerInfoToString(
//     player1: PlayerState,
//     player2: PlayerState,
//   ): string {
//     return color.white(
//       `\tPlayer 1: ${player1.name} VS Player 2: ${player2.name}\n`,
//     );
//   }
// }

// const gameState: GameState = {
//   gameId: new UuidGameId(),
//   boundaryMarkers: [
//     {
//       maximumCardNumber: 3,
//       owner: 'NOBODY',
//       player1Cards: [
//         {
//           color: 'blue',
//           value: 1,
//         },
//         {
//           color: 'purple',
//           value: 2,
//         },
//         {
//           color: 'yellow',
//           value: 3,
//         },
//       ],
//       player2Cards: [
//         {
//           color: 'brown',
//           value: 3,
//         },
//         {
//           color: 'green',
//           value: 4,
//         },
//       ],
//       id: 'A',
//       firstPlayerToComplete: '1',
//     },
//     {
//       maximumCardNumber: 3,
//       owner: 'NOBODY',
//       player1Cards: [],
//       player2Cards: [],
//       id: 'B',
//     },
//     {
//       maximumCardNumber: 3,
//       owner: 'NOBODY',
//       player1Cards: [],
//       player2Cards: [],
//       id: 'C',
//     },
//     {
//       maximumCardNumber: 3,
//       owner: '2',
//       player1Cards: [
//         {
//           color: 'blue',
//           value: 2,
//         },
//         {
//           color: 'purple',
//           value: 7,
//         },
//         {
//           color: 'yellow',
//           value: 4,
//         },
//       ],
//       player2Cards: [
//         {
//           color: 'brown',
//           value: 8,
//         },
//         {
//           color: 'green',
//           value: 9,
//         },
//         {
//           color: 'orange',
//           value: 9,
//         },
//       ],
//       id: 'D',
//     },
//     {
//       maximumCardNumber: 3,
//       owner: 'NOBODY',
//       player1Cards: [],
//       player2Cards: [],
//       id: 'E',
//     },
//     {
//       maximumCardNumber: 3,
//       owner: 'NOBODY',
//       player1Cards: [],
//       player2Cards: [],
//       id: 'F',
//     },
//     {
//       firstPlayerToComplete: '1',
//       maximumCardNumber: 3,
//       owner: '1',
//       player1Cards: [
//         {
//           color: 'blue',
//           value: 4,
//         },
//         {
//           color: 'purple',
//           value: 6,
//         },
//         {
//           color: 'yellow',
//           value: 9,
//         },
//       ],
//       player2Cards: [
//         {
//           color: 'brown',
//           value: 9,
//         },
//         {
//           color: 'green',
//           value: 2,
//         },
//         {
//           color: 'orange',
//           value: 1,
//         },
//       ],
//       id: 'G',
//     },
//     {
//       maximumCardNumber: 3,
//       owner: 'NOBODY',
//       player1Cards: [],
//       player2Cards: [],
//       id: 'H',
//     },
//     {
//       firstPlayerToComplete: '2',
//       maximumCardNumber: 3,
//       owner: 'NOBODY',
//       player1Cards: [],
//       player2Cards: [
//         {
//           color: 'orange',
//           value: 3,
//         },
//         {
//           color: 'green',
//           value: 3,
//         },
//         {
//           color: 'blue',
//           value: 3,
//         },
//       ],
//       id: 'I',
//     },
//   ],
//   currentPlayerID: '2',
//   player1: {
//     cards: [
//       {
//         color: 'blue',
//         value: 8,
//       },
//       {
//         color: 'purple',
//         value: 9,
//       },
//       {
//         color: 'yellow',
//         value: 7,
//       },
//     ],
//     name: 'Sacha',
//   },
//   player2: {
//     cards: [
//       {
//         color: 'orange',
//         value: 8,
//       },
//       {
//         color: 'blue',
//         value: 9,
//       },
//       {
//         color: 'orange',
//         value: 7,
//       },
//     ],
//     name: 'John',
//   },
//   status: 'INITIATED',
//   winner: 'NOBODY',
// };

// console.log(GameTextRenderer.render(gameState));
