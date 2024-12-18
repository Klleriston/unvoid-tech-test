import { isValidateDuration, getDayOfWeek, timeInRange } from '../utils/';
import { CalendarAvailability, CalendarSlot } from '../types';

export const isSlotAvailable = (availability: CalendarAvailability, slot: CalendarSlot): boolean => {
  if (!isValidateDuration(slot.durationM)) return false;
  const slotWeekday = getDayOfWeek(slot.start);
  const dayAvailable = availability.include.find(item => item.weekday === slotWeekday);
  if (!dayAvailable) return false;

  return timeInRange(slot.start, slot.durationM, dayAvailable.range);
};
