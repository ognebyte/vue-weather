import type { WeatherData, SearchLocation } from "@/utils/weatherInterface";


const API_URL: string = import.meta.env.VITE_API_URL
const API_KEY: string = import.meta.env.VITE_API_KEY
const FORECAST_DAYS: number = 3;
const FORECAST_URL: string = `${API_URL}/forecast.json?key=${API_KEY}&alerts=yes&aqi=yes&days=${FORECAST_DAYS}&q=`
const SEARCH_URL: string = `${API_URL}/search.json?key=${API_KEY}&q=`


async function fetchURLq(URL: string, query: string) {
    const response = await fetch(URL + query, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json()
}


export async function fetchWeather(query: string): Promise<WeatherData> {
    return await fetchURLq(FORECAST_URL, query)
}

export async function fetchSearchLocation(query: string): Promise<SearchLocation[]> {
    return await fetchURLq(SEARCH_URL, query)
}
