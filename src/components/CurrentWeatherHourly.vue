<script setup lang="ts">
import { computed } from 'vue';
import { Skeleton } from 'primevue';
import { storeWeather } from '@/store/store';
import { getHourlyWeatherFor } from '@/utils/getHourlyWeatherFor';
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
    <div class="card" style="min-height: 200px;">
        <Skeleton v-if="storeWeatherLoading" height="100%" />
        <div v-else class="card-content">
            <div class="card-label">
                <i class="pi pi-clock"></i>
                <p>Hourly weather</p>
            </div>

            <HourlyWeather :hourlyForecast="currentWeatherHourly" />
        </div>
    </div>
</template>
