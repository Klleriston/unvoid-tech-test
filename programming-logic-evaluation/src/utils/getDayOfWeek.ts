import { Weekday } from '../types';

export function getDayOfWeek(date: Date): Weekday {
  return date.getUTCDay() as Weekday;
}
