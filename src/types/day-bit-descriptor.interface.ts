export interface DayBitDescriptor {
  id: string;
  displayName: string;

  /**
   * Question to user when collecting DayBit value.
   */
  question: string;

  /**
   * How to interpret DayBit['value'] field.
   */
  type: 'number' | 'boolean' | 'string';

  /**
   * Associated color with that DayBit.
   * Expected format is HEX "#aabbcc".
   */
  color: string;

  /**
   * Emoji associated with DayBit.
   */
  icon?: string;

  /**
   * Description used to describe use cases of tracking DayBit.
   */
  description?: string;

  /**
   * Range for number field.
   */
  range?: [number | null, number | null];

  /**
   * If true, then DayBit should not be asked about at the end of the day.
   */
  shouldBeIgnored?: boolean;
}