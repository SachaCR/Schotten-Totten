import { InvalidCardColorError, InvalidCardValueError } from '../domainError';

export const cardColors = [
  'blue',
  'brown',
  'green',
  'purple',
  'orange',
  'yellow',
] as const;

export type CardColor = typeof cardColors[number];
export type CardDetails = { value: number; color: CardColor };

export class Card {
  private value: number;
  private color: CardColor;

  constructor(value: number, color: CardColor) {
    if (value > 9 || value < 1) {
      throw new InvalidCardValueError();
    }

    if (!cardColors.includes(color)) {
      throw new InvalidCardColorError();
    }

    this.color = color;
    this.value = value;
  }

  readCard(): CardDetails {
    return {
      value: this.value,
      color: this.color,
    };
  }
}
