<script setup lang="ts">
import { computed } from 'vue';
import { storeWeather } from '@/store/store';
import { Message, Skeleton } from 'primevue';

const hourlyForecast = computed(() => storeWeather.data.forecast.forecastday);
const currentWeatherHourly = computed(() => storeWeather.data.forecast.forecastday[0]);
const isCelsius = computed(() => storeWeather.isCelsius);
</script>

<template>
    <div class="card" style="min-height: 200px;">
        <Skeleton v-if="storeWeather.loading" height="100%" />
        <div class="card-content">
            <Message severity="secondary" variant="simple">
                <p class="h3-style">Today's forecast</p>
            </Message>
        </div>
    </div>
</template>

<style scoped></style>
