import moment from "moment";

export function getFormattedTime(time: string, currentTime: string, dateFormat: string, dayIndex: number) {
    const m = moment(time, dateFormat);
    const current = moment(currentTime, dateFormat);

    if (dayIndex === 0 && m.isSame(current)) return 'Now';
    return m.format('HH:mm') === '00:00'
        ? m.format('ddd, HH:mm')
        : m.format('HH:mm');
}