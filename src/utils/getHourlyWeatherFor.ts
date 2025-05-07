import moment from "moment"
import type { ForecastDay, HourlyForecast } from "@/utils/weatherInterface"


export function getHourlyWeatherFor(currentTime: string, forecastDays: ForecastDay[], days: number, dayIndex: number): HourlyForecast[] {
    const now = moment(currentTime)
    const allHours = forecastDays.flatMap(day => day.hour)

    // Фильтруем по времени: от текущего часа до конца завтрашнего дня
    if (dayIndex != 0) return allHours
    const filtered = allHours.filter(hour => {
        const hourMoment = moment(hour.time)
        return hourMoment.isSameOrAfter(now) && hourMoment.isBefore(now.clone().add(days, 'days').startOf('day'))
    })

    return filtered
}