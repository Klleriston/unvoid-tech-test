import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';
import { listAvailable30MinuteSlots } from '../4-list-available-30-minute-slots/list-available-30-minute-slots';
import { intersectSlots } from '../utils/intersectSlots';


export const listAvailable30MinuteSlotsMultiplePerson = (
  attendees: Array<{
    availability: CalendarAvailability;
    events: Array<CalendarEvent>;
  }>,
  range: [Date, Date],
): Array<CalendarSlot> => {
  if (attendees.length === 0) return [];
  const slotsList = attendees.map(attendee =>
    listAvailable30MinuteSlots(attendee.availability, attendee.events, range)
  );
  const commonSlots = intersectSlots(slotsList);

  return commonSlots;
};
