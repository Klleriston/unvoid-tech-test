import { isSlotAvailableWithBuffer } from '../3-is-slot-available-with-buffer/is-slot-available-with-buffer';
import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';
import { getDayOfWeek } from '../utils';

export const listAvailable30MinuteSlots = (
  availability: CalendarAvailability,
  events: Array<CalendarEvent>,
  range: [Date, Date],
): Array<CalendarSlot> => {
  const [rangeStart, rangeEnd] = range;
  const availableSlots: CalendarSlot[] = [];

  let currentDate = new Date(Date.UTC(
    rangeStart.getUTCFullYear(),
    rangeStart.getUTCMonth(),
    rangeStart.getUTCDate()
  ));

  const endDate = new Date(Date.UTC(
    rangeEnd.getUTCFullYear(),
    rangeEnd.getUTCMonth(),
    rangeEnd.getUTCDate()
  ));

  while (currentDate <= endDate) {
    const weekday = getDayOfWeek(currentDate);
    const dayAvailability = availability.include.find(a => a.weekday === weekday);

    if (dayAvailability) {
      const [rangeStartTime, rangeEndTime] = dayAvailability.range;

      const availabilityStart = new Date(currentDate);
      availabilityStart.setUTCHours(rangeStartTime.hours, rangeStartTime.minutes, 0, 0);

      const availabilityEnd = new Date(currentDate);
      availabilityEnd.setUTCHours(rangeEndTime.hours, rangeEndTime.minutes, 0, 0);

      let slotStart = new Date(availabilityStart);

     while (slotStart < availabilityEnd) {
        const slotEnd = new Date(slotStart.getTime() + 30 * 60000);

        if (slotEnd > availabilityEnd) {
          break;
        }

        if (slotStart >= rangeStart && slotEnd <= rangeEnd) {
          const slot: CalendarSlot = {
            start: new Date(slotStart),
            durationM: 30,
          };

          if (isSlotAvailableWithBuffer(availability, events, slot)) {
            availableSlots.push(slot);
          }
        }
        slotStart = slotEnd;
      }
    }
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  return availableSlots;
};
