import { DomainError, DomainErrorCode, GameOverError } from '../index';

describe('Component DomainError', () => {
  describe('Given a DomainError type: GameOverError', () => {
    describe('When I create a new instance', () => {
      const domainError = new GameOverError();

      it('Then it has the code GAME_OVER', () => {
        expect(domainError.code).toStrictEqual(DomainErrorCode.GAME_OVER);
      });

      it('Then it has the message: The game is over already', () => {
        expect(domainError.message).toStrictEqual('The game is over already');
      });

      it('Then it has the name DOMAIN_ERROR', () => {
        expect(domainError.name).toStrictEqual('DOMAIN_ERROR');
      });

      it('Then it is an instance of DomainError', () => {
        expect(domainError).toBeInstanceOf(DomainError);
        expect(domainError instanceof DomainError).toBeTruthy();
      });
    });
  });

  describe('Given a RangeError', () => {
    describe('When I create a new instance', () => {
      const rangeError = new RangeError();

      it('Then it is NOT an instance of DomainError', () => {
        expect(rangeError).not.toBeInstanceOf(DomainError);
        expect(rangeError instanceof DomainError).toBeFalsy;
      });
    });
  });
});
