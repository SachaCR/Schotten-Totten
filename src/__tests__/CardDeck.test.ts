import { CardDeck } from '../CardDeck';

describe('Component ClanCardDeck', () => {
  describe('Given I create a new ClanCardDeck', () => {
    const clanCardDeck = new CardDeck();

    it('Then it returns a ClanCardDeck instance', () => {
      expect(clanCardDeck).toBeInstanceOf(CardDeck);
    });

    describe('When I draw a clan card', () => {
      const card = clanCardDeck.drawClanCard();

      if (!card) {
        throw new Error('Card is undefined');
      }

      it('Then I get a 9 yellow', () => {
        expect(card).toBeDefined();
        expect(card.readCard()).toStrictEqual({
          value: 9,
          color: 'yellow',
        });
      });
    });

    describe('When I draw a tactical card', () => {
      const card = clanCardDeck.drawTacticalCard();

      it('Then I get nothing', () => {
        expect(card).toBeUndefined();
      });
    });
  });

  describe('Given I create a new ClanCardDeck', () => {
    const clanCardDeck = new CardDeck();

    describe('When I shuffle the deck', () => {
      clanCardDeck.shuffleDeck();

      describe('And I draw a card', () => {
        const card = clanCardDeck.drawClanCard();

        if (!card) {
          throw new Error('Card is undefined');
        }

        // Flakky test as the shuffle could set the 9 yellow on top of the deck.
        // @TODO Take time to make it testable
        it('Then I dont get a 9 yellow', () => {
          expect(card).toBeDefined();
          expect(card.readCard()).not.toStrictEqual({
            value: 9,
            color: 'yellow',
          });
        });
      });
    });
  });
});
