/**
 * Single day bit, like "mood" or "hours of sleep".
 * Day consists of those little bits of information.
 */
export interface DayBit {
  id: string;
  value: string | number | boolean;
}