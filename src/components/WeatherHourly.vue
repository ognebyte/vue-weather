<script setup lang="ts">
import { computed } from 'vue';
import { storeWeather } from '@/store/store';
import { getHourlyWeatherFor } from '@/utils/getHourlyWeatherFor';
import CardWeather from '@/components/CardWeather.vue';
import HourlyWeather from '@/components/HourlyWeather.vue';


const storeWeatherLoading = computed(() => storeWeather.loading);
const currentWeatherHourly = computed(() => {
    if (storeWeather.data.forecast.forecastday.length == 0) return [];
    const currentTime = storeWeather.currentHour.time;
    const dayIndex = storeWeather.prevDayIndex;
    const days = 2;
    const forecastDays = storeWeather.data.forecast.forecastday.slice(dayIndex, dayIndex + days);
    return getHourlyWeatherFor(currentTime, forecastDays, days, dayIndex);
});
</script>

<template>
    <CardWeather :loading="storeWeatherLoading" label="Hourly weather" minHeight="15rem">
        <template v-slot:icon>
            <i class="pi pi-clock"></i>
        </template>
        <template v-slot:addition>
            <HourlyWeather :hourlyForecast="currentWeatherHourly" />
        </template>
    </CardWeather>
</template>
