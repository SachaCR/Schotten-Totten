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
      throw new RangeError('INVALID_CARD_VALUE');
    }

    if (!cardColors.includes(color)) {
      throw new RangeError('INVALID_CARD_COLOR');
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
