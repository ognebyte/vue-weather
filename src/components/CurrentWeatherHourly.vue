<script setup lang="ts">
import { computed } from 'vue';
import { storeWeather } from '@/store/store';
import { getHourlyWeatherFor } from '@/utils/getHourlyWeatherFor';
import CardWeather from '@/components/CardWeather.vue';
import HourlyWeather from '@/components/HourlyWeather.vue';


const storeWeatherLoading = computed(() => storeWeather.loading);
const currentLocation = computed(() => storeWeather.data.location);
const currentWeatherHourly = computed(() => {
    if (storeWeather.data.forecast.forecastday.length == 0) return [];
    const days = 2;
    const forecastDays = storeWeather.data.forecast.forecastday.slice(0, days);
    return getHourlyWeatherFor(currentLocation.value.localtime, forecastDays, days);
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
