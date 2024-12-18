import { Time } from "src/types";

export function timeInRange(start:Date, duration: number, range: [Time, Time]): boolean {
    const slotStartMinutes = start.getUTCHours() * 60 + start.getUTCMinutes();
    const slotEndMinutes = slotStartMinutes + duration;

    const rangeStartMinutes = range[0].hours * 60 + range[0].minutes;
    const rangeEndMinutes = range[1].hours * 60 + range[1].minutes;

    return slotStartMinutes >= rangeStartMinutes && slotEndMinutes <= rangeEndMinutes;
}