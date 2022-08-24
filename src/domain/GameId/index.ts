import { v4 } from 'uuid';

export interface GameId {
  value(): string;
}

export class NanoGameId implements GameId {
  private id: string;

  constructor() {
    this.id = v4();
  }

  value(): string {
    return this.id;
  }

  static fromString(id: string): GameId {
    return {
      value: () => id,
    };
  }
}
