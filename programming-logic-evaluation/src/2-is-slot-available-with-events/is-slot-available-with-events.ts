import { getDayOfWeek, isOverlapping, isValidateDuration, timeInRange } from '../utils';
import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';

export const isSlotAvailableWithEvents = (
  availability: CalendarAvailability,
  events: Array<Omit<CalendarEvent, 'buffer'>>,
  slot: CalendarSlot,
): boolean => {
  if (!isValidateDuration(slot.durationM)) return false;

  const slotWeekday = getDayOfWeek(slot.start);

  const dayAvailability = availability.include.find(item => item.weekday === slotWeekday);

  if (!dayAvailability) return false;

  if (!timeInRange(slot.start, slot.durationM, dayAvailability.range)) return false;

  const slotEnd = new Date(slot.start.getTime() + slot.durationM * 60000);

  const hasConflict = events.some(event => isOverlapping(slot.start, slotEnd, event.start, event.end));
  return !hasConflict;
};
