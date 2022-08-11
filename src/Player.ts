import { Card, CardDetails } from './Card';

export type PlayerState = {
  name: string;
  cards: CardDetails[];
};

export class Player {
  private name: string;
  private cards: Card[];

  constructor(name: string) {
    this.name = name;
    this.cards = [];
  }

  receiveCard(card: Card): void {
    this.cards.push(card);
  }

  getName(): string {
    return this.name;
  }

  getCardCount(): number {
    return this.cards.length;
  }

  readState(): PlayerState {
    return {
      name: this.name,
      cards: this.cards.map((card) => card.readCard()),
    };
  }

  playCard(cardIndex: number): Card {
    if (cardIndex >= this.cards.length || cardIndex < 0) {
      throw new RangeError('INVALID_CARD_INDEX');
    }

    const card = this.cards.splice(cardIndex, 1)[0];

    return card;
  }
}
