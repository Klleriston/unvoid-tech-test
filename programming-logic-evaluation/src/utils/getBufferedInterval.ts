import { CalendarEvent } from "../types";

export function getBufferedInterval(event: CalendarEvent): [Date, Date] {
  const startWithBuffer = new Date(event.start.getTime() - (event.buffer?.before || 0) * 60000);
  const endWithBuffer = new Date(event.end.getTime() + (event.buffer?.after || 0) * 60000);

  return [startWithBuffer, endWithBuffer];
}
