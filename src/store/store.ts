import { reactive } from 'vue'
import { fetchSearchLocation, fetchWeather } from '@/api/weatherApi'
import type { SearchLocation, WeatherData } from '@/utils/weatherInterface'
import { initialStateWeatherData } from '@/utils/weatherInititalStates'


export const storeWeather = reactive({
    data: <WeatherData>initialStateWeatherData,
    initialStateData() {
        this.data = initialStateWeatherData
    },
    loading: <boolean>true,
    isCelsius: <boolean>true,
    dateFormat: <string>"YYYY-MM-DD HH:mm",
    error: <any>null,
    async changeLocation(query: string) {
        this.loading = true
        this.error = null
        this.initialStateData()
        try {
            const result = await fetchWeather(query);
            this.data = result;
            console.log(result)
        } catch (err) {
            this.error = err
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