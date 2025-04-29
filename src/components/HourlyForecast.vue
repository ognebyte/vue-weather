<script setup lang="ts">
import { computed } from 'vue';
import { storeWeather } from '@/store/store';

const hourlyForecast = computed(() => storeWeather.data.forecast.forecastday);
</script>

<template>
    <div>
        <!-- <div v-for="hour in hourlyForecast" :key="hour.time">
            <p>{{ hour.time.slice(-5) }}</p>
            <img :src="'https:' + hour.condition.icon" :alt="hour.condition.text" />
            <p>{{ hour.temp_c }}°C</p>
        </div> -->
    </div>
</template>

<style scoped></style>
