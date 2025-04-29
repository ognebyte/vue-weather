<script setup lang="ts">
import { computed } from 'vue';
import { storeWeather } from '@/store/store';

const dayForecast = computed(() => storeWeather.data.forecast.forecastday);
</script>

<template>
    <ul>
        <!-- <li>🌅 Восход: {{ astro.sunrise }}</li>
        <li>🌇 Закат: {{ astro.sunset }}</li>
        <li>🌙 Фаза луны: {{ astro.moon_phase }}</li> -->
    </ul>
</template>