import type {
    WeatherLocation,
    WeatherCondition,
    AirQuality,
    CurrentWeather,
    Astro,
    DayForecast,
    HourlyForecast,
    ForecastDay,
    Forecast,
    WeatherAlert,
    WeatherData,
    SearchLocation
} from "@/utils/weatherInterface";


export const initialStateWeatherLocation: WeatherLocation = {
    name: '',
    region: '',
    country: '',
    lat: 0,
    lon: 0,
    tz_id: '',
    localtime_epoch: 0,
    localtime: ''
};

export const initialStateWeatherCondition: WeatherCondition = {
    text: '',
    icon: '',
    code: 0
};

export const initialStateAirQuality: AirQuality = {
    co: 0,
    "gb-defra-index": 0,
    no2: 0,
    o3: 0,
    pm2_5: 0,
    pm10: 0,
    so2: 0,
    "us-epa-index": 0
};

export const initialStateCurrentWeather: CurrentWeather = {
    air_quality: initialStateAirQuality,
    cloud: 0,
    condition: initialStateWeatherCondition,
    dewpoint_c: 0,
    dewpoint_f: 0,
    feelslike_c: 0,
    feelslike_f: 0,
    gust_kph: 0,
    gust_mph: 0,
    heatindex_c: 0,
    heatindex_f: 0,
    humidity: 0,
    is_day: 0,
    last_updated: '',
    last_updated_epoch: 0,
    precip_in: 0,
    precip_mm: 0,
    pressure_in: 0,
    pressure_mb: 0,
    temp_c: 0,
    temp_f: 0,
    uv: 0,
    vis_km: 0,
    vis_miles: 0,
    wind_degree: 0,
    wind_dir: '',
    wind_kph: 0,
    wind_mph: 0,
    windchill_c: 0,
    windchill_f: 0
};

export const initialStateAstro: Astro = {
    is_moon_up: 0,
    is_sun_up: 0,
    moon_illumination: 0,
    moon_phase: '',
    moonrise: '',
    moonset: '',
    sunrise: '',
    sunset: ''
};

export const initialStateDayForecast: DayForecast = {
    avghumidity: 0,
    avgtemp_c: 0,
    avgtemp_f: 0,
    avgvis_km: 0,
    avgvis_miles: 0,
    condition: initialStateWeatherCondition,
    daily_chance_of_rain: 0,
    daily_chance_of_snow: 0,
    daily_will_it_rain: 0,
    daily_will_it_snow: 0,
    maxtemp_c: 0,
    maxtemp_f: 0,
    maxwind_kph: 0,
    maxwind_mph: 0,
    mintemp_c: 0,
    mintemp_f: 0,
    totalprecip_in: 0,
    totalprecip_mm: 0,
    totalsnow_cm: 0,
    uv: 0
};

export const initialStateHourlyForecast: HourlyForecast = {
    time_epoch: 0,
    time: '',
    temp_c: 0,
    temp_f: 0,
    is_day: 0,
    condition: initialStateWeatherCondition,
    wind_mph: 0,
    wind_kph: 0,
    wind_degree: 0,
    wind_dir: '',
    pressure_mb: 0,
    pressure_in: 0,
    precip_mm: 0,
    precip_in: 0,
    humidity: 0,
    cloud: 0,
    feelslike_c: 0,
    feelslike_f: 0,
    windchill_c: 0,
    windchill_f: 0,
    heatindex_c: 0,
    heatindex_f: 0,
    dewpoint_c: 0,
    dewpoint_f: 0,
    will_it_rain: 0,
    will_it_snow: 0,
    chance_of_rain: 0,
    chance_of_snow: 0,
    vis_km: 0,
    vis_miles: 0,
    gust_mph: 0,
    gust_kph: 0,
    uv: 0,
    diff_rad: 0,
    short_rad: 0,
    snow_cm: 0
};

export const initialStateForecastDay: ForecastDay = {
    date: '',
    date_epoch: 0,
    astro: initialStateAstro,
    day: initialStateDayForecast,
    hour: []
};

export const initialStateForecast: Forecast = {
    forecastday: []
};

export const initialStateWeatherAlert: WeatherAlert = {
    areas: '',
    category: '',
    certainty: '',
    desc: '',
    effective: '',
    event: '',
    expires: '',
    headline: '',
    instruction: '',
    msgtype: '',
    note: '',
    severity: '',
    urgency: ''
};

export const initialStateWeatherData: WeatherData = {
    location: initialStateWeatherLocation,
    current: initialStateCurrentWeather,
    forecast: initialStateForecast,
    alerts: {
        alert: []
    }
};