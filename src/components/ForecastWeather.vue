<script setup lang="ts">
import { computed } from 'vue';
import { Skeleton } from 'primevue';
import moment from 'moment';
import { storeWeather } from '@/store/store';
import { formatTemp } from '@/utils/formatTemp';


const forecastDay = computed(() => storeWeather.data.forecast.forecastday);
const storeWeatherIsCelsius = computed(() => storeWeather.isCelsius);
const storeWeatherLoading = computed(() => storeWeather.loading);
</script>

<template>
    <div v-for="i in 7" class="card">
        <Skeleton v-if="storeWeatherLoading" height="100%"></Skeleton>
        <div v-else class="card-content">
            <div class="flex-row" style="justify-content: space-between; align-items: center;">
                <h3>{{ moment(forecastDay[i-1].date, 'YYYY-MM-DD').format('dddd') }}</h3>
                <p>{{ moment(forecastDay[i-1].date, 'YYYY-MM-DD').format('MMMM D') }}</p>
            </div>
            <div class="flex-row">
                <img width="64" height="64" :src="'https:' + forecastDay[i-1].day.condition.icon" :alt="forecastDay[i-1].day.condition.text">
                <div class="flex-column" style="gap: 0.5rem;">
                    <p>{{ forecastDay[i-1].day.condition.text }}</p>
                    <h3>{{ formatTemp(storeWeatherIsCelsius, forecastDay[i-1].day.avgtemp_c, forecastDay[i-1].day.avgtemp_f) }}</h3>
                </div>
            </div>
            <ul>
                <li>🌡 Max: {{ formatTemp(storeWeatherIsCelsius, forecastDay[i-1].day.maxtemp_c, forecastDay[i-1].day.maxtemp_f) }}</li>
                <li>🌡 Min: {{ formatTemp(storeWeatherIsCelsius, forecastDay[i-1].day.mintemp_c, forecastDay[i-1].day.mintemp_f) }}</li>
                <li>💦 Humidity: {{ forecastDay[i-1].day.avghumidity }}%</li>
                <li>💧 Precip: {{ forecastDay[i-1].day.totalprecip_mm }} мм</li>
                <li>🌧 Chance of rain: {{ forecastDay[i-1].day.daily_chance_of_rain }}%</li>
            </ul>
        </div>
    </div>
</template>

<style scoped></style>
