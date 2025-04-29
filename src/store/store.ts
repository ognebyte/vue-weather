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
    async changeCity(query: string) {
        try {
            this.loading = true
            this.data = await fetchWeather(query)
            console.log(this.data)
        } catch (error) {
            alert(error)
        } finally {
            this.loading = false
        }
    }
})


export const storeLocation = reactive({
    data: <SearchLocation[]>[],
    initialStateData() {
        this.data = []
    },
    async searchLocation(query?: string) {
        try {
            if (query) {
                this.data = await fetchSearchLocation(query)
            } else {
                this.initialStateData()
            }
        } catch (error) {
            alert(error)
        }
    }
})