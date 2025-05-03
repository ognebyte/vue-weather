import type { WeatherData, SearchLocation } from "@/utils/weatherInterface";


const API_URL: string = import.meta.env.VITE_API_URL
const API_KEY: string = import.meta.env.VITE_API_KEY
const FORECAST_URL: string = `${API_URL}/forecast.json?key=${API_KEY}&alerts=yes&aqi=yes&tides=yes&days=7&q=`
const SEARCH_URL: string = `${API_URL}/search.json?key=${API_KEY}&q=`


export async function fetchWeather(query: string): Promise<WeatherData> {
    const response = await fetch(FORECAST_URL + query)
    if (!response.ok) throw new Error("Weather Response Error")
    return response.json()
}

export async function fetchSearchLocation(query: string): Promise<SearchLocation[]> {
    const response = await fetch(SEARCH_URL + query)
    if (!response.ok) throw new Error("Search Response Error")
    return response.json();
}
