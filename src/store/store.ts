import { reactive } from 'vue'
import moment from 'moment'
import { fetchSearchLocation, fetchWeather } from '@/api/weatherApi'
import type { ForecastDay, HourlyForecast, SearchLocation, WeatherData } from '@/utils/weatherInterface'
import { initialStateForecastDay, initialStateHourlyForecast, initialStateWeatherData } from '@/utils/weatherInititalStates'


function getClosestHourFromForecast(forecastDay: ForecastDay, currentDate: string): any {
    const currentHour = moment(currentDate, storeWeather.dateFormat).hour();
    const closestHour = forecastDay.hour.reduce((prev, curr) => {
        const currHour = moment(curr.time).hour();
        const prevHour = moment(prev.time).hour();
        return Math.abs(currHour - currentHour) < Math.abs(prevHour - currentHour) ? curr : prev;
    });

    return closestHour;
}


export const storeWeather = reactive({
    dateFormat: "YYYY-MM-DD HH:mm",
    loading: true,
    error: <any>null,
    isCelsius: true,
    data: initialStateWeatherData,
    current: initialStateForecastDay,
    currentHour: initialStateHourlyForecast,
    prevQuery: '',
    prevDayIndex: -1,

    initialStateData() {
        this.loading = true
        this.error = null
        this.data = initialStateWeatherData
        this.current = initialStateForecastDay
        this.currentHour = initialStateHourlyForecast
        this.prevQuery = ''
        this.prevDayIndex = -1
    },

    async changeLocation(query: string, dayIndex: number = 0) {
        try {
            if (this.prevQuery != query) {
                this.initialStateData()
                const result = await fetchWeather(query);
                this.data = result;
                this.prevQuery = query
            }
            const forecastday = this.data.forecast.forecastday;
            let selectedDay = forecastday[dayIndex];
            this.prevDayIndex = dayIndex;
            if (!selectedDay) {
                this.prevDayIndex = forecastday.length - 1;
                selectedDay = forecastday[forecastday.length - 1];
            }
            this.current = selectedDay;
            this.currentHour = getClosestHourFromForecast(selectedDay, this.data.location.localtime);
        } catch (err) {
            this.error = err;
        } finally {
            this.loading = false;
        }
    }
})


export const storeSearchLocations = reactive({
    data: <SearchLocation[]>[],
    initialStateData() {
        this.data = []
    },
    error: <any>null,
    async searchLocation(query?: string) {
        if (!query?.trim()) {
            this.initialStateData()
            return
        }
        try {
            this.data = await fetchSearchLocation(query)
        } catch (err) {
            this.error = err
            alert(err)
        }
    }
})