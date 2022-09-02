import { Player } from '../';
import { Card } from '../../Card';
import { DomainError } from '../../errors';

describe('Component Player', () => {
  describe('Given a player whos name is John', () => {
    const playerName = 'John';

    describe(`When I create a Player instance for ${playerName}`, () => {
      const player = new Player(playerName);

      it('Then it returns a Player instance', () => {
        expect(player).toBeInstanceOf(Player);
      });

      it(`Then player name is ${playerName}`, () => {
        expect(player.getName()).toStrictEqual(playerName);
      });

      it(`Then player cards count is 0`, () => {
        expect(player.getCardCount()).toStrictEqual(0);
      });

      it(`Then player state is empty`, () => {
        expect(player.readState()).toStrictEqual({
          name: playerName,
          cards: [],
        });
      });
    });
  });

  describe('Given a player', () => {
    const playerName = 'John';
    const player = new Player(playerName);

    describe(`When it receives a card`, () => {
      const card = new Card(1, 'blue');
      player.receiveCard(card);

      it(`Then player cards count is 1`, () => {
        expect(player.getCardCount()).toStrictEqual(1);
      });

      it(`Then player state return this card`, () => {
        expect(player.readState()).toStrictEqual({
          name: playerName,
          cards: [card.readCard()],
        });
      });
    });
  });

  describe('Given a player', () => {
    const playerName = 'John';
    const player = new Player(playerName);

    describe('With 3 card in hands', () => {
      const card0 = new Card(1, 'blue');
      const card1 = new Card(2, 'blue');
      const card2 = new Card(3, 'blue');

      player.receiveCard(card0);
      player.receiveCard(card1);
      player.receiveCard(card2);

      describe(`When he plays the second card at index 1`, () => {
        player.playCard(1);

        it(`Then the card is removed from the player state`, () => {
          expect(player.readState()).toStrictEqual({
            name: playerName,
            cards: [card0.readCard(), card2.readCard()],
          });
        });

        it(`Then player cards count is 2`, () => {
          expect(player.getCardCount()).toStrictEqual(2);
        });
      });
    });
  });

  describe('Given a player', () => {
    const playerName = 'John';
    const player = new Player(playerName);

    describe('With 3 card in hands', () => {
      const card0 = new Card(1, 'blue');
      const card1 = new Card(2, 'blue');
      const card2 = new Card(3, 'blue');

      player.receiveCard(card0);
      player.receiveCard(card1);
      player.receiveCard(card2);

      describe(`When he tries to play a card that dont exists`, () => {
        it(`Then it throws a INVALID_CARD_INDEX error`, () => {
          let error;
          try {
            player.playCard(-1);
          } catch (err: unknown) {
            if (err instanceof DomainError) {
              expect(err.code).toStrictEqual('INVALID_CARD_INDEX');
              expect(err.name).toStrictEqual('DOMAIN_ERROR');
              expect(err.message).toStrictEqual('This card index is invalid');
            }

            error = err;
          }

          expect(error).toBeInstanceOf(DomainError);
        });

        it(`Then it throws a INVALID_CARD_INDEX error`, () => {
          let error;

          try {
            player.playCard(3);
          } catch (err: unknown) {
            if (err instanceof DomainError) {
              expect(err.code).toStrictEqual('INVALID_CARD_INDEX');
              expect(err.name).toStrictEqual('DOMAIN_ERROR');
              expect(err.message).toStrictEqual('This card index is invalid');
            }

            error = err;
          }

          expect(error).toBeInstanceOf(DomainError);
        });
      });
    });
  });
});
