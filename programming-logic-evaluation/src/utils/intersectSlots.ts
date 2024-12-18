import { CalendarSlot } from "../types";

export function intersectSlots(slotsList: Array<Array<CalendarSlot>>): Array<CalendarSlot> {
  if (slotsList.length === 0) return [];

  let commonSlots = slotsList[0];

  for (let i = 1; i < slotsList.length; i++) {
    const currentSlots = slotsList[i];

    commonSlots = commonSlots.filter(slotA =>
      currentSlots.some(slotB => slotA.start.getTime() === slotB.start.getTime())
    );
  }

  return commonSlots;
}
