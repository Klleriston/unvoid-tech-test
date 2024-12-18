import { getBufferedInterval, getDayOfWeek, isOverlapping, isValidateDuration } from '../utils';
import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';

export const isSlotAvailableWithBuffer = (
  availability: CalendarAvailability,
  events: Array<CalendarEvent>,
  slot: CalendarSlot,
): boolean => {
  if (!isValidateDuration(slot.durationM)) return false;

  const slotWeekday = getDayOfWeek(slot.start);

  const dayAvailability = availability.include.find(item => item.weekday === slotWeekday);

  if (!dayAvailability) return false;

  const slotEnd = new Date(slot.start.getTime() + slot.durationM * 60000);

  const hasConflict = events.some(event => {
    const [startWithBuffer, endWithBuffer] = getBufferedInterval(event);
    return isOverlapping(slot.start, slotEnd, startWithBuffer, endWithBuffer);
  });

  return !hasConflict;
};
