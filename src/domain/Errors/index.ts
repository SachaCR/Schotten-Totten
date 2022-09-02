export enum DomainErrorCode {
  NOT_YOUR_TURN = 'NOT_YOUR_TURN',
  GAME_OVER = 'GAME_OVER',
  INVALID_BOUNDARY_ID = 'INVALID_BOUNDARY_ID',
  PLAYER_HAS_NOT_PLAYED = 'PLAYER_HAS_NOT_PLAYED',
  GAME_NOT_STARTED_OR_OVER = 'GAME_NOT_STARTED_OR_OVER',
  CARD_PLAYED_ALREADY = 'CARD_PLAYED_ALREADY',
  INVALID_CARD_INDEX = 'INVALID_CARD_INDEX',
  BOUNDARY_MARKER_IS_FULL = 'BOUNDARY_MARKER_IS_FULL',
  NOT_ENOUGH_CARD_IN_THE_CLAN_PILE = 'NOT_ENOUGH_CARD_IN_THE_CLAN_PILE',
  NOT_ENOUGH_CARD_IN_THE_TACTICAL_PILE = 'NOT_ENOUGH_CARD_IN_THE_TACTICAL_PILE',
  COMBINATION_RANK_NOT_FOUND = 'COMBINATION_RANK_NOT_FOUND',
  BOUNDARY_CANNOT_BE_CLAIMED = 'BOUNDARY_CANNOT_BE_CLAIMED',
  INVALID_CARD_VALUE = 'INVALID_CARD_VALUE',
  INVALID_CARD_COLOR = 'INVALID_CARD_COLOR',
}

export class DomainError extends Error {
  public code: DomainErrorCode;

  constructor(message: string, errorCode: DomainErrorCode) {
    super(message);
    this.name = 'DOMAIN_ERROR';
    this.code = errorCode;
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

export class NotYourTurnError extends DomainError {
  constructor() {
    super(`It's not your turn to play`, DomainErrorCode.NOT_YOUR_TURN);
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

export class GameOverError extends DomainError {
  constructor() {
    super('The game is over already', DomainErrorCode.GAME_OVER);
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

export class InvalidBoundaryError extends DomainError {
  constructor() {
    super('This boundary id is invalid', DomainErrorCode.INVALID_BOUNDARY_ID);
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

export class PlayerHasNotPlayedError extends DomainError {
  constructor() {
    super(
      'Player must play a card before ending turn',
      DomainErrorCode.PLAYER_HAS_NOT_PLAYED,
    );
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

export class CardPlayedAlreadyError extends DomainError {
  constructor() {
    super(
      'Player already played a card for this turn',
      DomainErrorCode.CARD_PLAYED_ALREADY,
    );
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}
export class InvalidCardIndexError extends DomainError {
  constructor() {
    super('This card index is invalid', DomainErrorCode.INVALID_CARD_INDEX);
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

export class BoundaryMarkerIsFullError extends DomainError {
  constructor() {
    super(
      'This boundary marker is full already',
      DomainErrorCode.BOUNDARY_MARKER_IS_FULL,
    );
  }
}

export class GameNotStartedOrOverError extends DomainError {
  constructor() {
    super(
      'This game is not started or is over already',
      DomainErrorCode.GAME_NOT_STARTED_OR_OVER,
    );
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

export class NotEnoughCardInTheClanPileError extends DomainError {
  constructor() {
    super(
      'There is no card left in the clan pile',
      DomainErrorCode.NOT_ENOUGH_CARD_IN_THE_CLAN_PILE,
    );
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

export class NotEnoughCardInTheTacticalPileError extends DomainError {
  constructor() {
    super(
      'There is no card left in the tactical pile',
      DomainErrorCode.NOT_ENOUGH_CARD_IN_THE_CLAN_PILE,
    );
  }
}

export class CombinationRankNotFoundError extends DomainError {
  constructor() {
    super(
      'There is no combination rank for this combination',
      DomainErrorCode.COMBINATION_RANK_NOT_FOUND,
    );
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

export class BoundaryCannotBeClaimedError extends DomainError {
  constructor() {
    super(
      'This boundary marker cannot be claimed',
      DomainErrorCode.BOUNDARY_CANNOT_BE_CLAIMED,
    );
  }
}

export class InvalidCardColorError extends DomainError {
  constructor() {
    super('Invalid card color', DomainErrorCode.INVALID_CARD_COLOR);
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

export class InvalidCardValueError extends DomainError {
  constructor() {
    super('Invalid card value', DomainErrorCode.INVALID_CARD_VALUE);
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}
