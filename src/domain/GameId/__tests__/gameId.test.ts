import { UuidGameId } from '..';

describe('Component UuidGameId', () => {
  describe('Given I want to generate a game id', () => {
    describe('When I create a new instance', () => {
      it('Then I can read a game id value', () => {
        const gameId = new UuidGameId();
        expect(gameId.value()).toStrictEqual(expect.any(String));
        expect(gameId.value().length).toStrictEqual(36);
      });
    });
  });

  describe('Given a game id string', () => {
    describe('When I want to create a GameId instance from this string', () => {
      it('Then it return a gameId with the string I passed', () => {
        const gameIdString = 'toto';
        const gameId = UuidGameId.fromString(gameIdString);
        expect(gameId.value()).toStrictEqual('toto');
      });
    });
  });
});
