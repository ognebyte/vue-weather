export interface WeatherData {
    location: WeatherLocation;
    current: CurrentWeather;
    forecast: Forecast;
    alerts: {
        alert: WeatherAlert[];
    };
}

export interface WeatherLocation {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
}

export interface WeatherCondition {
    text: string;
    icon: string;
    code: number;
}

export interface AirQuality {
    co: number
    "gb-defra-index": number
    no2: number
    o3: number
    pm2_5: number
    pm10: number
    so2: number
    "us-epa-index": number
}

export interface CurrentWeather {
    air_quality: AirQuality
    cloud: number;
    condition: WeatherCondition;
    dewpoint_c: number;
    dewpoint_f: number;
    feelslike_c: number;
    feelslike_f: number;
    gust_kph: number;
    gust_mph: number;
    heatindex_c: number;
    heatindex_f: number;
    humidity: number;
    is_day: number;
    last_updated: string;
    last_updated_epoch: number;
    precip_in: number;
    precip_mm: number;
    pressure_in: number;
    pressure_mb: number;
    temp_c: number;
    temp_f: number;
    uv: number;
    vis_km: number;
    vis_miles: number;
    wind_degree: number;
    wind_dir: string;
    wind_kph: number;
    wind_mph: number;
    windchill_c: number;
    windchill_f: number;
}

export interface Forecast {
    forecastday: ForecastDay[];
}

export interface ForecastDay {
    date: string;
    date_epoch: number;
    astro: Astro;
    day: DayForecast;
    hour: HourlyForecast[];
}

export interface Astro {
    is_moon_up: number;
    is_sun_up: number;
    moon_illumination: number;
    moon_phase: string;
    moonrise: string;
    moonset: string;
    sunrise: string;
    sunset: string;
}

export interface DayForecast {
    avghumidity: number;
    avgtemp_c: number;
    avgtemp_f: number;
    avgvis_km: number;
    avgvis_miles: number;
    condition: WeatherCondition;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
    daily_will_it_rain: number;
    daily_will_it_snow: number;
    maxtemp_c: number;
    maxtemp_f: number;
    maxwind_kph: number;
    maxwind_mph: number;
    mintemp_c: number;
    mintemp_f: number;
    totalprecip_in: number;
    totalprecip_mm: number;
    totalsnow_cm: number;
    uv: number;
}

export interface HourlyForecast {
    time_epoch: number;
    time: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: WeatherCondition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    will_it_rain: number;
    will_it_snow: number;
    chance_of_rain: number;
    chance_of_snow: number;
    vis_km: number;
    vis_miles: number;
    gust_mph: number;
    gust_kph: number;
    uv: number;
    diff_rad: number;
    short_rad: number;
    snow_cm: number;
}

export interface WeatherAlert {
    areas: string;
    category: string;
    certainty: string;
    desc: string;
    effective: string;
    event: string;
    expires: string;
    headline: string;
    instruction: string;
    msgtype: string;
    note: string;
    severity: string;
    urgency: string;
}

export interface SearchLocation {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    url: string;
}