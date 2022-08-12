import { Card } from '../Card';

export class CardDeck {
  private cards: Card[];
  private tacticalCards = [];

  private createClanCards(): Card[] {
    const cards = [];

    for (let i = 1; i <= 9; i++) {
      cards.push(new Card(i, 'blue'));
      cards.push(new Card(i, 'brown'));
      cards.push(new Card(i, 'green'));
      cards.push(new Card(i, 'purple'));
      cards.push(new Card(i, 'orange'));
      cards.push(new Card(i, 'yellow'));
    }

    return cards;
  }

  constructor() {
    this.cards = this.createClanCards();
    this.tacticalCards = [];
  }

  shuffleDeck(): void {
    const cards = this.cards;

    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }

    // @TODO When implementing tactical cards
    // const tacticalCards = this.tacticalCards;
    // for (let k = tacticalCards.length - 1; k > 0; k--) {
    //   const l = Math.floor(Math.random() * (k + 1));
    //   const temp = tacticalCards[k];
    //   tacticalCards[k] = tacticalCards[l];
    //   tacticalCards[l] = temp;
    // }
  }

  drawClanCard(): Card | undefined {
    const card = this.cards.pop();
    return card;
  }

  drawTacticalCard(): Card | undefined {
    const card = this.tacticalCards.pop();
    return card;
  }
}
