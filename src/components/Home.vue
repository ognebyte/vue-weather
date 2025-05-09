<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRoute, type LocationQuery } from 'vue-router';
import { storeWeather } from '@/store/store';
import ForecastDays from '@/components/ForecastDays.vue';
import WeatherCurrent from '@/components/WeatherCurrent.vue';
import WeatherHourly from '@/components/WeatherHourly.vue';
import WeatherDetails from '@/components/WeatherDetails.vue';
import AirQuality from '@/components/AirQuality.vue';
import Alerts from '@/components/Alerts.vue';


const route = useRoute()
const storeWeatherError = computed(() => storeWeather.error);
const initialLocation: string = '55.7558,37.6176';

function changeLocation(routeQuery: LocationQuery) {
    const day = !isNaN(Number(routeQuery.day)) ? Number(routeQuery.day) : 0;
    const lat = routeQuery.lat
    const lon = routeQuery.lon
    const query = lat && lon ? `${lat},${lon}` : initialLocation;
    storeWeather.changeLocation(query, day);
}

onMounted(() => {
    changeLocation(route.query)
})

watch(() => route.query, (query) => {
    changeLocation(query)
}, { immediate: false })
</script>


<template>
    <section v-if="storeWeatherError" class="error-wrapper flex-column">
        <h2>Ошибка загрузки данных</h2>
        <p>{{ storeWeatherError }}</p>
    </section>
    <section v-else class="flex-column gap">
        <ForecastDays />
        <WeatherCurrent />
        <WeatherHourly />
        <WeatherDetails />
        <AirQuality />
        <Alerts />
    </section>
</template>